const UserController = require('../controllers/user.controller')

//* User routes for register, login, and logout
module.exports = app => {
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)
}