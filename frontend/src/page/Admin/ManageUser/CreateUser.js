import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const CreateUser = ({ userInfo, handleLogout, children }) => {
    const [newUser, setNewUser] = useState({ username: '', phone: '', walletBalance: 0, password: '', roleID:'' , showPassword: false });
    const history = useHistory();
    const handleCreateUser = async () => {
        try {
        // Validate the form
        if (!newUser.username || !newUser.phone || !newUser.password || !newUser.roleID) {
            document.getElementById('validationMessage').innerText = 'Please fill out all required fields.';
            return false;
        }
        if (!/^\S+$/.test(newUser.username)) {
            document.getElementById('validationMessage').innerText = 'Username must not contain spaces.';
            return false;
        }
        
        if (!/^\d{10}$/.test(newUser.phone)) {
            document.getElementById('validationMessage').innerText ='Please enter a valid phone number with exactly 10 digits.';
            return false;
        }
        if (!/^-?\d+$/.test(newUser.walletBalance) || parseInt(newUser.walletBalance) < -1) {
            document.getElementById('validationMessage').innerText ='Wallet balance must contain only numbers and no minus values accepted.';
            return false;
        }
        if (!/^\d{4}$/.test(newUser.password)) {
            document.getElementById('validationMessage').innerText ='Password must be exactly 4 digits long.';
            return false;
        }
        
        // Send request to backend to create user
        const response = await axios.post('/Admin/ManageUser/createUser', newUser);
        
        if (response.status === 201) {
            // User created successfully
            Swal.fire({
                position: "center", 
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            });
            history.goBack();
            }                    
        } catch (error) {
            if (error.response && error.response.status === 400) {
                document.getElementById('validationMessage').innerText = "Username or phone number already exists";
                return false;
            } else if(error){
                console.error('Error creating user:', error);
            }
        }
    };

    return (
        <div className="container-fluid bg-light">
        <div className="row">
            {/* Navbar */}
            <NavComponent userInfo={userInfo} handleLogout={handleLogout} />
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3">
                <div className="container-fluid">
                <main className="p-3 p-md-5 bg-light rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title mt-5 "><b>Create User</b></h3>
                    <button className="btn btn-info shadow text-white mt-4" onClick={() => history.goBack()}>Go Back</button>
                    </div>
                    <section className="CreateUser">
                    <form className="contact-form row">
                        {/* Form fields */}
                        {/* Username */}
                        <div className="form-field col-lg-6">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="text" className="input-text js-input" id="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
                        </div>
                        {/* Phone Number */}
                        <div className="form-field col-lg-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="number" className="input-text js-input" id="phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} required />
                        </div>
                        {/* Wallet Balance */}
                        <div className="form-field col-lg-6">
                        <label htmlFor="walletBalance" className="form-label">Wallet Balance</label>
                        <input type="number" className="input-text js-input" id="walletBalance" value={newUser.walletBalance} onChange={(e) => setNewUser({ ...newUser, walletBalance: e.target.value })} required />
                        </div>
                        {/* Password */}
                        <div className="form-field col-lg-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                            <input
                                type={newUser.showPassword ? "text" : "password"}
                                className="input-text js-input  "
                                id="text"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />
                            </div>
                        </div>
                        {/* Role */}
                        <div className="form-field col-lg-12">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            className="form-select bg-light btn-outline-none"
                            id="role"
                            value={newUser.roleID}
                            onChange={(e) => setNewUser({ ...newUser, roleID: e.target.value })}
                            style={{ width: '50%' }}
                        >
                            <option value="" disabled>Select Role</option>
                            <option value={1}>User</option>
                            <option value={2}>Admin</option>
                        </select>
                        </div>
                        {/* Validation Message and Create User Button */}
                        <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                        <div id="validationMessage" className="text-danger mb-2"></div>
                        <button type="button" className="btn btn-primary shadow" onClick={handleCreateUser}>Create User</button>
                        </div>
                    </form>
                    </section>
                </main>
                </div>
            </div>
            {children}
            </main>
        </div>
        </div>
    );
};

export default CreateUser;
