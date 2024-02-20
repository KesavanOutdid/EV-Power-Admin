import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const UpdateUser = ({userInfo, handleLogout,children }) => {
    const [userData, setUserData] = useState({
        _id: '',
        username: '',
        phone: '',
        walletBalance: 0,
        password: '',
        roleID: ''
    });
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Extract user data from location state
        const { user } = location.state;
        if (user) {
            setUserData(user);
        }
    }, [location]);

    // Validation function to check if all required fields are filled and meet additional criteria
    const validateForm = () => {
        if (!userData.password || !userData.roleID) {
            document.getElementById('validationMessage').innerText = 'Please fill out all required fields.';
            return false;
        }
        if (!/^\d{4}$/.test(userData.password)) {
            document.getElementById('validationMessage').innerText ='Password must be exactly 4 digits long.';
            return false;
        }
        document.getElementById('validationMessage').innerText = '';
        return true;
    };


    const handleUpdateUser = async () => {
        try {
            // Validate the form
            if (validateForm()) {

                console.log('updating user user:', userData);
                await axios.put(`/ManageUser/updateUser/${userData._id}`, userData);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                history.goBack();
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <div className="container-fluid bg-light">
            <div className="row ">
            {/* Navbar */}
            <NavComponent userInfo={userInfo} handleLogout={handleLogout} />
            
            {/* Sidebar */}
            <Sidebar />
    
            {/* Main content */}
            <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
            <div className="container-fluid ">
                <main className="p-3 p-md-5 bg-light rounded position-relative">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title mt-5 "><b>Update User</b></h3>
                    <button className="btn btn-info text-white mt-4 shadow"  onClick={() => history.goBack()} >Go Back</button>
                </div>
                <section className="CreateUser">
                <form className="contact-form row">
                    <div className="form-field col-lg-6">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="input-text js-input" 
                            id="username" 
                            value={userData.username} 
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })} 
                            readOnly // Set readOnly to prevent editing
                        />
                    </div>
                    <div className="form-field col-lg-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input 
                            type="text" 
                            className="input-text js-input" 
                            id="phone" 
                            value={userData.phone} 
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })} 
                            readOnly // Set readOnly to prevent editing
                        />
                    </div>
                        <div className="form-field col-lg-6">
                            <label htmlFor="walletBalance" className="form-label">Wallet Balance</label>
                            <input type="number" className="input-text js-input" id="walletBalance" value={userData.walletBalance} onChange={(e) => setUserData({ ...userData, walletBalance: e.target.value })} />
                        </div>
                        <div className="form-field col-lg-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="text" className="input-text js-input" id="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                        </div>
                        {/* Role */}
                        <div className="form-field col-lg-12">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                className="form-select bg-light btn-outline-none"
                                id="role"
                                value={userData.roleID}
                                onChange={(e) => setUserData({ ...userData, roleID: e.target.value })}
                                style={{ width: '50%' }}
                            >
                                <option value="" disabled>Select Role</option>
                            {/* <option value="1" selected={newUser.roleID === '1'}>User</option>
                            <option value="2" selected={newUser.roleID === '2'}>Admin</option> */}
                            <option value="1" >User</option>
                            <option value="2" >Admin</option>
                            </select>
                            </div>

                        <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                <div id="validationMessage" className="text-danger mb-2"></div>
                                <button type="button" className="btn btn-primary shadow"  onClick={handleUpdateUser}>Update User</button>
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

export default UpdateUser;
