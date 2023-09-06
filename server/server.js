const express = require("express"); 
const cors = require("cors");
const app = express();

require("./config/mongoose.config");

require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

const UserRoutes = require('./routes/user.routes');
UserRoutes(app);

const TaskListRoutes = require('./routes/taskList.routes');
TaskListRoutes(app);

app.listen(8000, () => console.log("Listening on Port 8000"));