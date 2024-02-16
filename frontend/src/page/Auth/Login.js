import React, { useState,useRef  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import EV2 from '../../assets/images/EV_Logo2.png';
import Swal from 'sweetalert2';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState(['', '', '', '']);
    const passwordRefs = useRef([]);

    const handleChange = (index, value) => {
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
    };
    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace') {
            if (index > 0) {
                const newPassword = [...password];
                newPassword[index - 0] = '';
                setPassword(newPassword);
                // Move focus to the previous input field
                passwordRefs.current[index - 1].focus();
            }
        } else if (event.key !== 'Enter') {
            const value = event.key;
            const newPassword = [...password];
            newPassword[index] = value;
            setPassword(newPassword);
    
            // Move focus to the next input field if not the last one
            if (index < 3 && passwordRefs.current[index + 1]) {
                const nextIndex = index + 1;
                passwordRefs.current[nextIndex].focus();
            }
        }
    };
    
    
    
    const handleLoginRequest = async (e) => {
        e.preventDefault();
        try {
            const enteredPassword = password.join('');
            const response = await axios.post('http://192.168.1.12:5000/login', { username, phone, password: enteredPassword });
            console.log("username: "+response.data.username);
            handleLogin({ ...response.data });
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login failed",   
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
                                            type="password"
                                            autoComplete="on" // Enable autocomplete
                                            value={char}
                                            maxLength="0"
                                            className="form-control form-control-lg input mr-2"
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            required
                                            ref={(inputRef) => passwordRefs.current[index] = inputRef}
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
