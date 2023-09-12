// Import necessary libraries and modules
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

// Define the ViewTask component
const ViewTask = (props) => {

    // Get the 'id' parameter from the route URL using React Router's 'useParams' hook
    const {id} = useParams();

    // Initialize a state variable 'newTask' to store task details
    const [newTask, setNewTask] = useState({
        taskName: "",
        description: ""
    });

    // Use the 'useEffect' hook to fetch task details when the component mounts or 'id' changes
    useEffect(() => {
        axios.get(`http://localhost:8000/api/oneTask/${id}`)
            .then((res) => {
                console.log(res.data)
                setNewTask(res.data)
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    }, [id]);

    // Render the component's UI
    return (
        <div>
            <div className="container mx-auto w-11/12">
            <div>
                <NavBar/>
            </div>
            <div className="text-center text-2xl mb-10">
                <h1>Task View</h1>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <div>
                    <input className="text-black w-80 mb-5 rounded" type="text" name="taskName" defaultValue={newTask.taskName} readOnly/>
                </div>
                <div className="flex flex-col">
                    <label>Description:</label>
                    <textarea className="text-black resize-none h-32 p-2 border border-gray-300 rounded bg-white" id="description" name="description" defaultValue={newTask.description} rows="4" cols="50" readOnly></textarea>
                </div>
                <div className="space-x-4">
                    <button className="bg-green-500 rounded h-7 w-20 mt-5" onClick={() => window.history.back()}>Go Back</button> 
                </div>
            </div>
        </div>
        </div>
    )
}

// Export the ViewTask component for use in other parts of the application
export default ViewTask;