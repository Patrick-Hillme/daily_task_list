// Import necessary libraries and modules
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the Homepage component
const Homepage = (props) => {

    // React Router hook for navigation
    const navigate = useNavigate();

    // Event handler to log the user out
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Render the component's UI
    return (
        <div>
            <header className="flex items-center justify-around mt-10">
                <div>
                    <h1 className="text-6xl bg-gradient-to-r from-sky-500 to-green-500 text-transparent bg-clip-text">Welcome to DTL!</h1>
                </div>
                <div>
                    <button onClick={logout} className="bg-sky-500 w-24 rounded-full float-right">Logout</button>
                </div>
            </header>

            <p className="text-slate-200 text-center mt-14 text-xl">You will find your role for today on the schedule. Please select a role to see your DTL.</p>

            <div className="flex flex-col items-center mt-20 gap-10">
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-40 h-20 text-5xl rounded-full hover:from-pink-500 hover:to-yellow-500">
                        <Link to={'/swat'} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-600 hover:from-pink-500 hover:to-yellow-500">SWAT</Link>
                    </button>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-72 h-20 text-5xl rounded-full hover:from-pink-500 hover:to-yellow-500">
                    <Link to={'/inventory'} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-slate-600">Inventory</Link>
                    </button>
                </div>
                <div>
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-blue-500/40 w-96 h-20 text-5xl rounded-full hover:from-pink-500 hover:to-yellow-500">
                    <Link to={'/merchandising'} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-slate-600">Merchandising</Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

// Export the Homepage component for use in other parts of the application
export default Homepage;