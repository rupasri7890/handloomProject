import React from "react";
import "./LoginForm.css";
import Card from "../Card/Card";

const LoginForm =()=>{
    return <Card>
        <h1 className="title">Sign In</h1>
        <p className="subtitle">
            Please login with your username and password</p>
        <form>
            <div className="inputs_container">
                <input type="text"placeholder="Username" />
                <input type="password" placeholder="Password"/>
            </div>
            <input type="submit" value="Log In" className="login_button" />
        </form>
        <div className="link_container">
            <a href=" "className="small">Forgot </a>
        </div>
    </Card>;
};
export default LoginForm;