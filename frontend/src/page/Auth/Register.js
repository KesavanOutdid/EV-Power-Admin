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
    const [setMessage] = useState("");
    const history = useHistory();
    const passwordRefs = useRef([]);

    const handleChange = (index, value) => {
        const newPassword = [...password];
        newPassword[index] = value;
        setPassword(newPassword);
    };
    
    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace") {
            if (index > 0) {
                const newPassword = [...password];
                newPassword[index - 1] = "";
                setPassword(newPassword);
                // Move focus to the previous input field
                passwordRefs.current[index - 1].focus();
            }
        } else if (event.key !== "Enter") {
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

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (!/^\S+$/.test(username)) {
                setMessage("Username must not contain spaces.");
                return false;
            }

            if (!/^\d{10}$/.test(phone)) {
                setMessage("Please enter a valid phone number with exactly 10 digits.");
                return false;
            }

            if (!/^\d{4}$/.test(password.join(""))) {
                setMessage("Password must be exactly 4 digits long.");
                return false;
            }

            await axios.post("register", {
                username,
                phone,
                password: password.join(""),
            });
            history.push("/login");
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "SignUp failed",   
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
                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN UP</button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
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
