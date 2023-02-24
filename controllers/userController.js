const { fetchUsers } = require("../models.js/usersModel")

const getUsers = (request, response, next) => {
    fetchUsers().then( (data) => {
        response.status(200).send({"users" : data})
    })
}

module.exports = { getUsers }