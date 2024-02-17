/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';


const CreateUserRoles = ({userInfo, handleLogout,children }) => {
    const [newRole, setNewRole] = useState({ roleID: '', roleName: '' });
    const history = useHistory();


    // Validation function to check if all required fields are filled and meet additional criteria
    const validateForm = () => {
        const roleID = newRole.roleID;
        const roleName = newRole.roleName;
        if (!roleID || !roleName) {
            document.getElementById('validationMessage').innerText = 'Please fill out all required fields.';
            return false;
        }
        // Check if roleID contains only numbers and is not less than 1
        if (!/^[1-9]\d*$/.test(roleID)) {
            document.getElementById('validationMessage').innerText = 'Role ID must contain only numbers and be greater than 0.';
            return false;
        }
        document.getElementById('validationMessage').innerText = '';
        return true;
    };


    // Function to handle creating a new user
    const handleCreateRole = async () => {
        try {
            // Validate the form
            if (validateForm()) {
                console.log('Creating userRoles:', newRole);
                await axios.post('createUserRoles', newRole);
                setNewRole({ roleID: '', roleName: '' });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:"Successfully created User Role!",
                    showConfirmButton: false,
                    timer: 1500
                });
                
                history.goBack();
            }
        } catch (error) {
            console.error('Error creating role:', error);
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
                        <h3 className="card-title mt-5 "><b>Create UserRole</b></h3>
                        <button className="btn btn-info text-white mt-4"  onClick={() => history.goBack()} >Go Back</button>
                    </div>
                    <section className="CreateUser">
                        <form className="contact-form row">
                            <div className="form-field col-lg-6">
                                <label className="form-label" htmlFor="RoleID">RoleID</label>
                                <input
                                    type="text"
                                    id="RoleID"
                                    className="input-text js-input"
                                    placeholder="Role ID"
                                    value={newRole.roleID}
                                    required
                                    onChange={(e) => setNewRole({ ...newRole, roleID: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="RoleName" className="form-label">Role Name</label>
                                <input
                                    type="text"
                                    id="RoleName"
                                    className="input-text js-input"
                                    placeholder="Role Name"
                                    value={newRole.roleName}
                                    required
                                    onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
                                />
                                </div>
                            <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                <div id="validationMessage" className="text-danger mb-2"></div>
                                <button type="button" className="btn btn-primary" onClick={handleCreateRole}>Create UserRoles</button>
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
export default CreateUserRoles;
