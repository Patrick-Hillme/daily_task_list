import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EditTask = (props) => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState({
        taskName: "",
        description: ""
    });

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

    const changeHandler = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8000/api/updateTask/${id}`, newTask);
            console.log(response);
            navigate('/swat')
        }
        catch (err) {
            console.error('Error updating task', err)
        }
    }

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
                    <input className="text-black" type="text" name="taskName" value={newTask.taskName} onChange={changeHandler} />
                </div>
                <div className="flex flex-col">
                    <label>Description:</label>
                    <textarea className="text-black resize-none h-32 p-2 border border-gray-300 rounded bg-white" id="description" name="description" value={newTask.description} rows="4" cols="50" onChange={changeHandler}></textarea>
                </div>
                <div className="space-x-4">
                    <button className="bg-green-500 rounded h-7 w-20 mt-5">Update</button>
                    <button className="bg-green-500 rounded h-7 w-20" onClick={() => navigate('/swat')}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditTask;