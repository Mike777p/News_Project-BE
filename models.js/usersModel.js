const db = require("../db/connection");

const fetchUsers = () => {
    return db.query(`SELECT * FROM users`).then((data)=> {
        return data.rows
    })
}

module.exports = { fetchUsers }