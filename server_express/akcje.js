import { link } from './db/baza_conn.mjs';

class Akcje {
    // GET pobieranie wszystkich nawyków
    findAllHabits(req, res) {
        link.query('SELECT * FROM habits_list', (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    }

    // POST dodawanie nawyku z opisem
    createNewHabit(req, res) {
        const { name, description } = req.body;
        const sql = 'INSERT INTO habits_list (name, description) VALUES (?, ?)';

        link.query(sql, [name, description || ""], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ id: result.insertId, name, description, streak: 0 });
        });
    }

    // PUT edycja nazwy i opisu
    updateHabit(req, res) {
        const id = req.params.id;
        const { name, description } = req.body;
        const sql = 'UPDATE habits_list SET name = ?, description = ? WHERE id = ?';

        link.query(sql, [name, description, id], (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows === 0) return res.status(404).send('Nie znaleziono nawyku');
            res.json({ message: 'Nawyk zaktualizowany!' });
        });
    }

    // PUT odhaczanie nawyku
    completeHabit(req, res) {
        const id = req.params.id;
        // zwiększ streak tylko jeśli last_completed nie jest dzisiejszą datą
        const sql = `
            UPDATE habits_list 
            SET streak = streak + 1, last_completed = CURDATE() 
            WHERE id = ? AND (last_completed IS NULL OR last_completed < CURDATE())
        `;

        link.query(sql, [id], (err, result) => {
            if (err) return res.status(500).send(err);

            // jeśli affectedRows === 0, oznacza to, że warunek nie został spełniony
            if (result.affectedRows === 0) {
                return res.sendStatus(204);            }
            res.json({ message: 'Nawyk wykonany!' });
        });
    }

    // DELETE
    deleteHabit(req, res) {
        const id = req.params.id;
        link.query('DELETE FROM habits_list WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.sendStatus(204);
        });
    }
}

const akcje = new Akcje();
export { akcje };