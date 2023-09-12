// Import necessary libraries and modules
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the EditTask component
const EditTask = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: "",
        description: ""
    });

    // Fetch the task's details by its ID when the component mounts
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

    // Event handler to update the 'newTask' state when input fields change
    const changeHandler = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value })
    };

    // Event handler to submit the updated task details
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8000/api/updateTask/${id}`, newTask);
            console.log(response);
            window.history.back();
        }
        catch (err) {
            console.error('Error updating task', err)
        }
    }

    // Render the component's UI
    return (
        <div className="container mx-auto w-11/12">
            <div>
                <NavBar/>
            </div>
            <div className="text-center text-2xl mb-10">
                <h1>Edit Task</h1>
            </div>
            <form className="flex flex-col items-center space-y-4" onSubmit={submitHandler}>
                <div>
                    <input className="text-black w-80 mb-5 rounded" type="text" name="taskName" value={newTask.taskName} onChange={changeHandler} />
                </div>
                <div className="flex flex-col">
                    <label>Description:</label>
                    <textarea className="text-black resize-none h-32 p-2 border border-gray-300 rounded bg-white" id="description" name="description" value={newTask.description} rows="4" cols="50" onChange={changeHandler}></textarea>
                </div>
                <div className="space-x-4">
                    <button className="bg-green-500 rounded h-7 w-20 mt-5">Update</button>
                </div>
            </form>
        </div>
    )
}

// Export the EditTask component for use in other parts of the application
export default EditTask;