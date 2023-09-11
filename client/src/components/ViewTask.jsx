import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const ViewTask = (props) => {

    const {id} = useParams();

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
                    <input className="text-black w-80 mb-5" type="text" name="taskName" defaultValue={newTask.taskName} readOnly/>
                </div>
                <div className="flex flex-col">
                    <label>Description:</label>
                    <textarea className="text-black resize-none h-32 p-2 border border-gray-300 rounded bg-white" id="description" name="description" defaultValue={newTask.description} rows="4" cols="50" readOnly></textarea>
                </div>
                <div className="space-x-4">
                    <button className="bg-green-500 rounded h-7 w-20" onClick={() => window.history.back()}>Go Back</button> 
                </div>
            </div>
        </div>
        </div>
    )
}

export default ViewTask;