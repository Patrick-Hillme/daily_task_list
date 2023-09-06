

const LogAndReg = () => {
    return (
        <div>
            <div className="mb-12 mt-8">
                <h1 className="text-white text-center text-5xl">Welcome to Daily Task List!</h1>
                <h2 className="text-white text-center text-3xl">Register or log in to start planning!</h2>
            </div>

            <div className="flex justify-around m-4">
                <div className="w-1/3 border-2 rounded-lg">
                    <form className="flex-col m-5">
                        <h1 className="text-center text-xl">Register</h1>
                        <div className="m-2 mb-5 mt-5">
                            <label>First Name:</label>
                            <input type="text" className="rounded-xl"/>
                        </div>
                        <div className="m-2 mb-5">
                            <label>Last Name:</label>
                            <input type="text" className="rounded-xl"/>
                        </div>
                        <div className="m-2 mb-5">
                            <label>Email:</label>
                            <input type="email" className="rounded-xl"/>
                        </div>
                        <div className="m-2 mb-5">
                            <label>Password:</label>
                            <input type="password" className="rounded-xl"/>
                        </div>
                        <div className="m-2">
                            <label>Confirm Password:</label>
                            <input type="password" className="rounded-xl"/>
                        </div>
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