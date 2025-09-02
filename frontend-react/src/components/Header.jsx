import {useContext} from "react";
import Button from "./Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";


const Header = () => {
        const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext); // notice the curly braces. This is object destructuring to extract values from the context object not the useState array
        const navigate = useNavigate();

        const handleLogout = () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setIsLoggedIn(false);
            console.log("Logged out successfully");
            navigate('/login');
        }
    return (
        <>
            <nav className="container navbar pt-3 pb-3 align-items-start">
                <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>
                <div>
                    {isLoggedIn ? (
                        <button text="Logout" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    ):(
                    <>
                        <Button text="Register" class="btn-outline-info" url="/register"/>
                        &nbsp; &nbsp;
                        <Button text="Login" class="btn-info" url="/login"/>
                    </>)}
                </div>
            </nav>
        </>
    )
}

export default Header;