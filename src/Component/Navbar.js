import { Link } from "react-router-dom";

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>The IoT Application</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Application</Link>
            </div>
        </nav>
    );
}

export default Navbar;
