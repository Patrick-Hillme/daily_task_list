const express = require("express"); 
const cors = require("cors");
const app = express();

require("./config/mongoose.config");

require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allow cookies and other credentials to be included
    optionsSuccessStatus: 204,  // A successful OPTIONS response with no data
};
app.use(cors(corsOptions));

const UserRoutes = require('./routes/user.routes');
UserRoutes(app);

const TaskListRoutes = require('./routes/taskList.routes');
TaskListRoutes(app);

app.listen(8000, () => console.log("Listening on Port 8000"));