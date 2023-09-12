//* Import the required modules
const express = require("express"); 
const cors = require("cors");
const app = express();

//* Connect to a MongoDB database using Mongoose
require("./config/mongoose.config");

//* Load environment variables from a .env file
require('dotenv').config();

//* Parse incoming JSON and form data
app.use(express.json(), express.urlencoded({ extended: true }));

//* Configure CORS options to allow specific origins, HTTP methods, credentials, and response status
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allow cookies and other credentials to be included
    optionsSuccessStatus: 204,  // A successful OPTIONS response with no data
};
app.use(cors(corsOptions));

//* Import and set up routes for User-related endpoints
const UserRoutes = require('./routes/user.routes');
UserRoutes(app);

//* Import and set up routes for Task List-related endpoints
const TaskListRoutes = require('./routes/taskList.routes');
TaskListRoutes(app);

//* Start the Express server on port 8000 and log a message when it's listening
app.listen(8000, () => console.log("Listening on Port 8000"));