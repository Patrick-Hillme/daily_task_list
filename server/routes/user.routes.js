const userController = require('../controllers/user.controller')
const UserController = require('../controllers/user.controller')

module.exports = app => {
    app.post('/api/register', UserController.register)
    app.post('/api/login', userController.login)
    app.post('/api/logout', userController.logout)
}