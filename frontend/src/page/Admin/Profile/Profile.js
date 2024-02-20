import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import Avatar from '../../../assets/images/faces/contact1.jpg';

const AdminProfile = ({ children, handleLogout, userInfo }) => {
    const [users, setUsers] = useState({
        _id: userInfo._id,
        username: userInfo.username,
        phone: userInfo.phone ,
        password: userInfo.password,
    });
    const [userData, setUserData] = useState({
        _id: userInfo._id,
        username: userInfo.username,
        phone: userInfo.phone ,
        walletBalance: 0,
        password: '',
        roleID: ''
    });
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/ManageProfile');
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userData._id]);

    const handleUpdateProfile = async () => {
        try {
            await axios.put(`/ManageProfile/updateProfile/${userInfo._id}`, userData);
            Swal.fire({
                className:"",
                position: "top-center",
                icon: "success",
                title: "Profile updated successfully",
                showConfirmButton: false,
                timer: 1500
            });

            setUsers(prevUserData => ({ ...prevUserData, password: userData.password }));
        } catch (error) {
            console.error('Error updating profile:', error);
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
                            {/* Profile */}
                            <section className='bg-light'>
                                <div className="container py-5 mt-4 bg-light">
                                    <div className="row bg-light">
                                        <div className="col-lg">
                                            <div className="card mb-4 bg-light">
                                                <div className="card-body text-center">
                                                <img src={Avatar} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px', height: '150px' }} />
                                                </div>
                                                <section className="CreateUser">
                                                        <form className="contact-form row">
                                                            <div className="form-field col-lg-12 text-center">
                                                                <label htmlFor="username" className="form-label ">Username</label>
                                                                <input
                                                                    type="text"
                                                                    className="input-text js-input text-center"
                                                                    id="username"
                                                                    value={userData.username}
                                                                    readOnly // Set readOnly to prevent editing
                                                                />
                                                            </div>
                                                            <div className="form-field col-lg-6">
                                                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                                                <input
                                                                    type="text"
                                                                    className="input-text js-input "
                                                                    id="phone"
                                                                    defaultValue={userData.phone}
                                                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="form-field col-lg-6">
                                                                <label htmlFor="password" className="form-label">Password</label>
                                                                <input
                                                                    type="text"
                                                                    className="input-text js-input r"
                                                                    id="password"
                                                                    defaultValue={users.password}
                                                                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                                                <button type="button" className="btn btn-primary shadow" onClick={handleUpdateProfile}>Update User</button>
                                                            </div>
                                                        </form>
                                                    </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminProfile;
