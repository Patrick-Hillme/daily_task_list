import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {

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
        <div className="flex justify-around mt-5 items-center border-b-[3px] pb-5 mb-10">
            <div>
                <Link to={'/homepage'} className="text-xl">Home</Link>
            </div>
            <div>
                <h1 className="text-5xl">DTL</h1>
            </div>
            <div>
                <button onClick={logout} className="bg-sky-500 w-24 rounded-full float-right">Logout</button>
            </div>
        </div>
    )
}

export default NavBar;