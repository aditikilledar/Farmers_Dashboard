import React, {useState} from "react";

const Signup: React.FC = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        let body = {
            "firstname": firstName,
            "lastname": lastName,
            "username": userName,
            "email": email,
            "password": password
        }
        console.log(body)
        const response = await fetch("http://localhost:5000/api/signup", {
            method:'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        console.log(response)
        // console.log("Signup with", { firstName, lastName, userName, email, password });
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2> Signup New User </h2>
                <div className="signup-form-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <label>User Name:</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div>
                            <label>Email ID:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>

                </div>
            </div>
        </div>
        
    );
    
}

export default Signup;