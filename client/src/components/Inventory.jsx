// Import necessary libraries and modules
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define the Inventory component
const Inventory = (props) => {

    // React Router hook for navigation
    const navigate = useNavigate();

    // Initialize state variables for tasks and a new task
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Fetch initial task data from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/api/allTasks')
            .then((res) => {
                setTaskList(res.data)
            });
    }, []);

    // Event handler to update the 'newTask' state when the input field changes
    const changeHandler = (e) => {
        setNewTask(e.target.value);
    }

    // Event handler to submit a new task to the server
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/newTask', {
                taskName: newTask
            })
            if (response.status === 200) {
                setTaskList([ ...taskList, response.data ]);
                setNewTask('');
            }
        }
        catch (err) {
            console.error("Error creating task:", err)
        }
    }

    // Event handler to toggle the completion status of a task
    const handleCheckBox = (taskId) => {
        setTaskList(taskList.map(newTask => {
            if ( newTask._id === taskId) {
                return { ...newTask, completed: !newTask.completed }
            }
            return newTask;
        }))
    }

    // Event handler to add a suggested task to the list
    const addSuggestedTask = async (suggestedTask) => {
        try {
            const response = await axios.post('http://localhost:8000/api/newTask', {
                taskName: suggestedTask,
            });
            if (response.status === 200) {
                setTaskList([ ...taskList, response.data ]);
            }
        }
        catch {
            console.error('Error creating task:', err);
        }
    };

    // Event handler to delete a task
    const deleteTask = (newTaskId) => {
        console.log(newTaskId)
        axios.delete(`http://localhost:8000/api/deleteTask/${newTaskId}`)
            .then((res) => {
                console.log(res.data)
                setTaskList(taskList.filter((newTask) => newTask._id !== newTaskId));
            })
            .catch((err) => {
                console.error("Error deleting task",err)
            })
    }

    // Render the component's UI
    return (
        <div className="container mx-auto w-11/12">
            <div>
                <NavBar/>
            </div>
            <h1 className="text-3xl">Inventory</h1>
            <p className="mt-5 text-white">Inventory is dedicated to delivering tech products from the store's warehouse to our customers. Inventory tasks include things such as unloading trucks, shipping and receiving product, staging product for deliveries, and securing product. </p>
            <div className="flex justify-between mt-10">
                <div className="w-1/3">
                    <h2 className="border-b w-30 mb-5 text-lg">Task Suggestions (Click to add)</h2>
                    <ul className="list-disc m-5 cursor-pointer">
                        <li onClick={() => addSuggestedTask("Unload truck")}>Unload truck</li>
                        <li onClick={() => addSuggestedTask("Stage product for delivery")}>Stage product for delivery</li>
                        <li onClick={() => addSuggestedTask("Receive drop shipments")}>Receive drop shipments</li>
                        <li onClick={() => addSuggestedTask("Pack and stage shipping")}>Pack and stage shipping</li>
                        <li onClick={() => addSuggestedTask("Truck check out/in")}>Truck check out/in</li>
                    </ul>
                </div>
                <div className="w-2/4">
                    <h1 className="border-b mb-5 text-lg">Tasks</h1>
                    <form onSubmit={submitHandler} className="flex">
                        <input className="text-black mr-10 w-60 mb-10 rounded h-7" type="text" placeholder="Add a new task" value={ newTask } onChange={changeHandler}/>
                        <button className="bg-green-500 h-7 w-20 rounded">Add</button>
                    </form>
                    <div>
                        <div>
                            { taskList.map((newTask) => (
                                <div key={newTask._id} className="mb-5 bg-slate-500 h-7 rounded">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="form-checkbox h-7 w-5 mr-2" checked={newTask.completed} onChange={() => handleCheckBox(newTask._id)}/>
                                        <span className="bg-slate-200 text-black w-96 rounded mr-5 h-7 pl-2" style={{ textDecoration: newTask.completed ? 'line-through' : 'none' }}>
                                                {newTask.taskName}
                                        </span>
                                        <button className="mr-5 bg-green-500 rounded w-10" onClick={() => navigate(`/editTask/${newTask._id}`)}>edit</button>
                                        <button className="mr-5 bg-sky-500 rounded w-10" onClick={() => navigate(`/viewTask/${newTask._id}`)}>View</button>
                                        <button className="bg-red-600 rounded w-16 mr-5" onClick={() => deleteTask(newTask._id)}>delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export the Inventory component for use in other parts of the application
export default Inventory;