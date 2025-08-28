import React from "react";
import Button from "./Button.jsx";

const Header = () => {
    return (
        <>
            <nav className="container navbar pt-3 pb-3 align-items-start">
                <a className="navbar-brand text-light" href="">Stock Prediction Portal</a>
                <div>
                    <Button text="Register" class="btn-outline-info"/>
                    &nbsp; &nbsp;
                    <Button text="Login" class="btn-info"/>
                </div>
            </nav>
        </>
    )
}

export default Header;