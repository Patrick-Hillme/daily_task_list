import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = (props) => {

    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <header className="flex items-center justify-around mt-10">
                <div>
                    <h1 className="text-6xl">Welcome to DTL!</h1>
                </div>
                <div>
                    <button onClick={logout} className="bg-sky-500 w-24 rounded-full float-right">Logout</button>
                </div>
            </header>

            <p className="text-white text-center mt-14">You'll find your role for today on the schedule. Select a role to see your DTL.</p>

            <div className="flex justify-center grid-flow-row gap-5 mt-14">
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-40 h-20 text-5xl rounded-full">
                        <Link to={'/swat'} className="bg-gradient-to-r from-cyan-500 to-blue-500">SWAT</Link>
                    </button>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-72 h-20 text-5xl rounded-full">
                    <Link to={'/inventory'} className="bg-gradient-to-r from-cyan-500 to-blue-500">Inventory</Link>
                    </button>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-96 h-20 text-5xl rounded-full">
                    <Link to={'/merchandising'} className="bg-gradient-to-r from-cyan-500 to-blue-500">Merchandising</Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Homepage;