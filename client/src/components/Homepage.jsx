import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            You have successfully logged in!
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Homepage;