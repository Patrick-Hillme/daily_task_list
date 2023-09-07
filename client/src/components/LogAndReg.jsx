import axios from 'axios';
import { useState } from 'react';

const LogAndReg = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]:e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('User Data:', user);
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
            console.log(res)
            })
            .catch((err) => {
                console.log("Error response data:", err.response.data);
                // console.log("Caught an error:", err);
                // console.log(err.response.data);
                setErrors(err.response.data.errors)
            });
    };

    return (
        <div>
            <div className="nav-bar flex justify-center text-4xl mt-4">
                <h1 className="text-blue-500">DTL</h1>
            </div>
            <div className="mb-12 mt-6">
                <h1 className="text-white text-center text-4xl">Welcome to Daily Task List!</h1>
                <h2 className="text-white text-center text-2xl">Register or log in to start planning!</h2>
            </div>

            <div className="flex justify-around m-4">
                <div className="w-1/3 border-2 rounded-lg">
                    <form className="flex-col m-5" onSubmit={submitHandler}>
                        <h1 className="text-center text-xl">Register</h1>
                        <div className="m-2 mb-5 mt-5">
                            <label>First Name:</label>
                            <input type="text" className="rounded-xl text-black" value={user.firstName} name='firstName' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.firstName
                            ? <p>{ errors.firstName.message }</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label>Last Name:</label>
                            <input type="text" className="rounded-xl text-black" value={user.lastName} name='lastName' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.lastName
                            ? <p>{errors.lastName.message}</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label>Email:</label>
                            <input type="email" className="rounded-xl text-black" value={user.email} name='email' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.email
                            ? <p>{errors.email.message}</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label>Password:</label>
                            <input type="password" className="rounded-xl text-black" value={user.password} name='password' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.password
                            ? <p>{errors.password.message}</p>
                            : null
                        }
                        <div className="m-2">
                            <label>Confirm Password:</label>
                            <input type="password" className="rounded-xl text-black" value={user.confirmPassword} name='confirmPassword' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.confirmPassword
                            ? <p>{errors.confirmPassword.message}</p>
                            : null
                        }
                        <div className="m-2 flex justify-end">
                            <button className="bg-lime-500 rounded w-16 mt-4 text-center">Register</button>
                        </div>
                    </form>
                </div>

                <div className="w-1/4 border-2 rounded-lg">
                    <form className="flex-col m-5">
                        <h1 className="text-center text-xl">Login</h1>
                        <div className="m-2 mb-5 mt-5">
                            <label>Email:</label>
                            <input type="email" className="rounded-xl"/>
                        </div>
                        <div className="m-2">
                            <label>Password:</label>
                            <input type="password" className="rounded-xl"/>
                        </div>
                        <div className="m-2 flex justify-end">
                            <button className="bg-lime-500 rounded w-16 mt-4 text-center">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LogAndReg;