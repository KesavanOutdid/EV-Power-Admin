import React, { useState,useRef  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import EV2 from '../../assets/images/EV_Logo2.png';
import Swal from 'sweetalert2';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [phone] = useState("");
    const [password, setPassword] = useState(['', '', '', '']);
    const passwordRefs = useRef([]);

    const handleChange = (index, value) => {
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
    };

    const handleLoginRequest = async (e) => {
        e.preventDefault();
        try {
            const enteredPassword = password.join('');
            const response = await axios.post('/login', { username, phone, password: enteredPassword });
            console.log("username: "+response.data.username);
            handleLogin({ ...response.data });
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login failed",
                text: "Invalid Credentials",
                customClass: {
                    popup: 'swal-popup-center', // Center the entire popup
                    icon: 'swal-icon-center',   // Center the icon within the popup
                },
            });
        }
    };

    return (
        <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                <img src={EV2} alt="logo" />
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            <form className="pt-3 " onSubmit={handleLoginRequest}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="form-control form-control-lg "
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-between">
                                    {password.map((char, index) => (
                                        <input
                                            key={index}
                                            ref={(inputRef) => passwordRefs.current[index] = inputRef}
                                            type="password" // Set the type to "number" to allow only numeric input
                                            autoComplete="on" // Enable autocomplete
                                            value={char}
                                            // Limit to one character
                                            className="form-control form-control-lg input"
                                            style={{
                                                margin: 3,
                                                flex: 1,
                                                textAlign: 'center',
                                                padding: '10px',
                                                boxSizing: 'border-box',
                                            }}  
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                handleChange(index, newValue);

                                                if (newValue && index < password.length - 1) {
                                                    // Move focus to the next input if a value is entered
                                                    passwordRefs.current[index + 1].focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Delete') {
                                                    e.preventDefault();
                                                    // Delete the value and move focus to the next input
                                                    handleChange(index, '');
                                                    if (index < password.length - 1) {
                                                        passwordRefs.current[index + 1].focus();
                                                    }
                                                } else if (e.key === 'Backspace') {
                                                    e.preventDefault();
                                                    // Delete the current value and move focus to the previous input
                                                    handleChange(index, '');
                                                    if (index > 0) {
                                                        passwordRefs.current[index - 1].focus();
                                                    }
                                                }
                                            }}        
                                            required
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                                <div className="mt-3">
                                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                                </div>
                                <div className="text-center mt-4 font-weight-light">
                                    Don't have an account? <Link to="/register" className="text-primary">Create</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default Login;
