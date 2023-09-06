const TaskList = require('../models/taskList.model')

//! Task List

//* Create a new Task
module.exports.createNewTask = (req, res) => {
    TaskList.create(req.body)
    .then(newTask => {
        res.json(newTask)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' })
    });
};

// Read all tasks
module.exports.getAllTasks = (req, res) => {
    TaskList.find({})
    .then((allTasks) => {
        res.json(allTasks)
    })
    .catch((err) => {
        res.status(400).json(err)
    });
};

//* Read One Task
module.exports.getOneTask = (req,res) => {
    TaskList.findOne({ _id: req.params.id })
    .then(oneTask => {
        res.json(oneTask)
    })
    .catch((err) => {
        res.status(400).json(err)
    });
};

//* Update one Task
module.exports.updateOneTask = (req,res) => {
    TaskList.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true, runValidators: true}
    )
    .then(updateTask => {
        res.json(updateTask)
    })
    .catch((err) => {
        res.status(400).json(err)
    });
};

//* Delete Existing Task
module.exports.deleteExistingTask = (req, res) => {
    TaskList.deleteOne({ _id: req.params.id })
        .then(deleteTask => {
            res.json(deleteTask)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
};