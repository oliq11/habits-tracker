import mysql from 'mysql';

const link = mysql.createConnection ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

link.connect(err => {
    if (err) throw err;
    console.log("CONNECTED");
})

export {link};