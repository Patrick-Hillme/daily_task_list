const TaskList = require('../models/taskList.model')

//! Task List
module.exports.createNewTask = (req, res) => {
    TaskList.create(req.body)
    .then(newTask => {
        res.json(newTask)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    })
}