import React from "react";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="container navbar pt-3 pb-3 align-items-start">
                <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>
                <div>
                    <Button text="Register" class="btn-outline-info" url="/register"/>
                    &nbsp; &nbsp;
                    <Button text="Login" class="btn-info" url="/login"/>
                </div>
            </nav>
        </>
    )
}

export default Header;