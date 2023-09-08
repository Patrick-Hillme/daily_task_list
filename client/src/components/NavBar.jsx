import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <div className="flex ">
            <div>
                <h1 className="text-5xl">DTL</h1>
            </div>
            <div>
                <Link to={'/homepage'} className="text-">Home</Link>
            </div>
        </div>
    )
}

export default NavBar;