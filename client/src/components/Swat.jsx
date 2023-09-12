import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Swat = (props) => {

    const navigate = useNavigate();

    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/allTasks')
            .then((res) => {
                setTaskList(res.data)
            });
    }, []);

    const changeHandler = (e) => {
        setNewTask(e.target.value);
    }

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

    const handleCheckBox = (taskId) => {
        setTaskList(taskList.map(newTask => {
            if ( newTask._id === taskId) {
                return { ...newTask, completed: !newTask.completed }
            }
            return newTask;
        }))
    }

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

    return (
        <div className="container mx-auto w-11/12">
            <div>
                <NavBar/>
            </div>
            <h1 className="text-3xl text-slate-200">SWAT</h1>
            <p className="mt-5 text-slate-200 text-lg">SWAT ensures inventory integrity in the store through a variety of inventory adjustments and data collection tools. The role is to identify, determine, and communicate high shrink categories, identify the root cause of replinishment issues, and follow up with leadership until the problem is resolved. You will communicate and coach store employees and leadership on the importance of inventory integrity and process gaps that are identified.</p>
            <div className="flex justify-between mt-10">
                <div className="w-1/3">
                    <h2 className="border-b w-30 mb-5 text-lg">Task Suggestions (Click to add)</h2>
                    <ul className="list-disc m-5 cursor-pointer">
                        <li onClick={() => addSuggestedTask("Daily counts")}>Daily counts</li>
                        <li onClick={() => addSuggestedTask("Check inventory adjustments")}>Check inventory adjustments</li>
                        <li onClick={() => addSuggestedTask("Process Write Off")}>Process Write Off</li>
                        <li onClick={() => addSuggestedTask("Follow up on emails")}>Follow up on emails</li>
                        <li onClick={() => addSuggestedTask("Comminicate issues to leadership")}>Comminicate issues to leadership</li>
                    </ul>
                </div>
                <div className="w-2/4">
                    <h1 className="border-b mb-5 text-lg">Tasks</h1>
                    <form onSubmit={submitHandler} className="flex">
                        <input className="text-black mr-10 w-60 mb-10 rounded h-7 bg-slate-200" type="text" placeholder="Add a new task" value={ newTask } onChange={changeHandler}/>
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
                                        <button className="mr-5 bg-green-500 rounded w-10" onClick={() => navigate(`/editTask/${newTask._id}`)}>Edit</button>
                                        <button className="mr-5 bg-sky-500 rounded w-10" onClick={() => navigate(`/viewTask/${newTask._id}`)}>View</button>
                                        <button className="bg-red-600 rounded w-16" onClick={() => deleteTask(newTask._id)}>Delete</button>
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

export default Swat;