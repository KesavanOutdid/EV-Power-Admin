import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import EV2 from "../../assets/images/EV_Logo2.png";
import Swal from 'sweetalert2';

const Register = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState(["", "", "", ""]);
    const history = useHistory();
    const passwordRefs = useRef([]);

    const handleChange = (index, value) => {
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
    };
    function RegError(Message){
        Swal.fire({
            title: "SignUp failed", 
            text: Message,
            icon: "error",
            customClass: {
                popup: 'swal-popup-center', // Center the entire popup
                icon: 'swal-icon-center',   // Center the icon within the popup
            },
        });
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!/^\S+$/.test(username)) {
                let setMessage ="Username must not contain spaces.";
                RegError(setMessage);
                return false;
            }

            if (!/^\d{10}$/.test(phone)) {
                let setMessage ="Please enter a valid phone number with exactly 10 digits.";
                RegError(setMessage);
                return false;
            }

            if (!/^\d{4}$/.test(password.join(""))) {
                let setMessage ="Password must be exactly 4 digits long.";
                RegError(setMessage);
                return false;
            }

            await axios.post("/register", {
                username,
                phone,
                password: password.join(""),
            });
            history.push("/");
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "SignUp failed", 
                text: error,
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
                                <form className="pt-3 " onSubmit={handleRegister}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="PhoneNumber"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
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
                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN UP</button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Already have an account? <Link to="/" className="text-primary">Login</Link>
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

export default Register;
