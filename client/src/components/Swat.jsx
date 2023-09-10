import { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";


const Swat = (props) => {

    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');

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

    return (
        <div className="container mx-auto w-11/12">
            <div>
                <NavBar/>
            </div>
            <h1 className="text-4xl">SWAT</h1>
            <p className="mt-5 text-white">This is a description of what SWAT is and the tasks they perfom.</p>
            <div className="flex justify-between mt-10">
                <div className="w-1/3">
                    //! Placeholder for Tasks suggestions
                </div>
                <div className="w-1/3">
                    <h1 className="mb-5">Tasks</h1>
                    <form onSubmit={submitHandler} className="flex">
                        <input className="text-black mr-10 w-60 mb-10 rounded h-7" type="text" placeholder="Add a new task" value={ newTask } onChange={changeHandler}/>
                        <button className="bg-green-500 h-7 w-20 rounded">Add</button>
                    </form>
                    <div>
                        <ul>
                            { taskList.map((newTask) => (
                                <li key={newTask._id} className="mb-5">
                                    <input type="checkbox"  className="form-checkbox h-5 w-5 text-green-600 " checked={newTask.completed} onChange={() => handleCheckBox(newTask._id)} />
                                    <span style={{ textDecoration: newTask.completed ? 'line-through' : 'none' }}>
                                    { newTask.taskName }
                                    </span>
                                </li>
                            )) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Swat;