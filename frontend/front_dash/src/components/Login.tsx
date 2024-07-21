import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigateToSignup = () => {
        navigate('/signup')
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // do all the items after being logged in like calling backend API
        console.log("Logged in with", { email, password });

        // On successful login
        navigate('/weather');
    };

    // return the frontend
    return (
        <div className="login-page">
            <div className="login-container">
                <h2> Login here to Access Dashboard </h2>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Login</button>
                    </form>

                </div>
                <div>
                    <h3>Not a user? <button onClick={navigateToSignup}> Create user </button></h3>
                </div>
            </div>
        </div>

    );

};

export default Login;