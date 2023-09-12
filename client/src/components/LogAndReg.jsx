import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogAndReg = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    const loginHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const submitLoginHandler = (e) => {
        e.preventDefault();
        console.log('User Data:', user);
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
            .then((res) => {
                console.log(res)
                navigate('/homepage')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

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
            navigate('/homepage')
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
                <h1 className="bg-gradient-to-r from-sky-500 to-green-500 text-transparent bg-clip-text text-6xl font-semibold">DTL</h1>
            </div>
            <div className="mb-12 mt-6">
                <h1 className="bg-gradient-to-r from-sky-500 to-green-500 text-transparent bg-clip-text text-center text-4xl">Welcome to Daily Task List</h1>
                <h2 className="bg-gradient-to-r from-sky-500 to-green-500 text-transparent bg-clip-text text-center text-2xl">Register or log in to start planning</h2>
            </div>

            <div className="flex justify-around m-4">
                <div className="w-1/3 border-2 rounded-lg border-sky-500">
                    <form className="flex-col m-5" onSubmit={submitHandler}>
                        <h1 className="text-center text-2xl text-sky-500">Register</h1>
                        <div className="m-2 mb-5 mt-5">
                            <label className='text-sky-500'>First Name:</label>
                            <input type="text" className="rounded-xl text-black bg-slate-300" value={user.firstName} name='firstName' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.firstName
                            ? <p>{ errors.firstName.message }</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label className='text-sky-500'>Last Name:</label>
                            <input type="text" className="rounded-xl text-black bg-slate-300" value={user.lastName} name='lastName' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.lastName
                            ? <p>{errors.lastName.message}</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label className='text-sky-500'>Email:</label>
                            <input type="email" className="rounded-xl text-black bg-slate-300" value={user.email} name='email' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.email
                            ? <p>{errors.email.message}</p>
                            : null
                        }
                        <div className="m-2 mb-5">
                            <label className='text-sky-500'>Password:</label>
                            <input type="password" className="rounded-xl text-black bg-slate-300" value={user.password} name='password' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.password
                            ? <p>{errors.password.message}</p>
                            : null
                        }
                        <div className="m-2">
                            <label className='text-sky-500'>Confirm Password:</label>
                            <input type="password" className="rounded-xl text-black bg-slate-300" value={user.confirmPassword} name='confirmPassword' onChange={changeHandler}/>
                        </div>
                        {
                            errors && errors.confirmPassword
                            ? <p>{errors.confirmPassword.message}</p>
                            : null
                        }
                        <div className="m-2 flex justify-end">
                            <button className="bg-sky-500 rounded w-16 mt-4 text-center">Register</button>
                        </div>
                    </form>
                </div>

                <div className="w-1/4 border-2 rounded-lg border-green-500">
                    <form className="flex-col m-5" onSubmit={submitLoginHandler}>
                        <h1 className="text-center text-2xl text-green-500">Login</h1>
                        <div className="m-2 mb-5 mt-5">
                            <label className='text-green-500'>Email:</label>
                            <input type="email" className="rounded-xl text-black bg-slate-300" value={userLogin.email} name='email' onChange={loginHandler}/>
                        </div>
                        {
                            errors && errors.email
                            ? <p>{errors.email.message}</p>
                            : null
                        }
                        <div className="m-2">
                            <label className='text-green-500'>Password:</label>
                            <input type="password" className="rounded-xl text-black bg-slate-300" value={userLogin.password} name='password' onChange={loginHandler}/>
                        </div>
                        {
                            errors && errors.password
                            ? <p>{errors.password.message}</p>
                            : null
                        }
                        <div className="m-2 flex justify-end">
                            <button className="bg-green-500 rounded w-16 mt-4 text-center">Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LogAndReg;