from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'habits'

def connection():
    h=app.config['MYSQL_HOST']
    d=app.config['MYSQL_DB']
    u=app.config['MYSQL_USER']
    p=app.config['MYSQL_PASSWORD']
    link=pymysql.connect(host=h, user=u, password=p, database=d)
    return link

@app.route('/api/habits', methods=['GET'])
def get():
    conn = connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM habits_list")
    res = cursor.fetchall()
    conn.close()
    return jsonify(res)

@app.route('/api/habits', methods=['POST'])
def add():
    data = request.json
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO habits_list (name, description) VALUES (%s, %s)", 
                   (data.get('name'), data.get('description', "")))
    conn.commit()
    conn.close()
    return jsonify({"status": "ok"}), 201

@app.route('/api/habits/<int:id>', methods=['DELETE'])
def delete(id):
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM habits_list WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    return '', 204

@app.route('/api/habits/<int:id>/complete', methods=['PUT'])
def done(id):
    conn = connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    
    # sprawdź datę ostatniego wykonania
    cursor.execute("SELECT last_completed, streak FROM habits_list WHERE id = %s", (id,))
    habit = cursor.fetchone()
    
    if not habit:
        conn.close()
        return jsonify({"error": "Nie znaleziono"}), 404

    # resetuj streak do 0, jeśli minęło więcej niż 1 dzień (przerwa w nawyku)
    sql_reset = """
        UPDATE habits_list 
        SET streak = 0 
        WHERE id = %s AND last_completed < DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    """
    cursor.execute(sql_reset, (id,))
    
    # zwiększ streak tylko jeśli dzisiaj jeszcze nie było kliknięte
    sql_update = """
        UPDATE habits_list 
        SET streak = streak + 1, last_completed = CURDATE() 
        WHERE id = %s AND (last_completed IS NULL OR last_completed < CURDATE())
    """
    cursor.execute(sql_update, (id,))
    conn.commit()
    
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"status": "already_done"}), 400
        
    conn.close()
    return jsonify({"status": "updated"})

@app.route('/api/habits/<int:id>', methods=['PUT'])
def update_habit(id):
    data = request.json
    conn = connection() 
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    sql = "UPDATE habits_list SET name = %s, description = %s WHERE id = %s"
    cursor.execute(sql, (data.get('name'), data.get('description'), id))
    conn.commit()
    conn.close()
    return jsonify({"status": "updated"})

if __name__ == '__main__':
    app.run(port=4000, debug=True)