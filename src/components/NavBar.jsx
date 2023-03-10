import { Link } from "react-router-dom"

function NavBar(){
    return (
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/not-found">Not found</Link>
        </div>
    )
}

export default NavBar