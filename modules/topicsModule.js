const db = require("../db/connection");
// console.log(db.topicData)

exports.fetchTopics = (()=>{
    return db.query(`SELECT * FROM topics`).then((data)=>{
        return data.rows
    })
})

