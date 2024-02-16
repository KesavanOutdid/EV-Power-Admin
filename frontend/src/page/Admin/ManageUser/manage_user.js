import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const ManageUser = ({userInfo, handleLogout,children  }) => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://192.168.1.12:5000/ManageUser');
            console.log(response.data)
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of users from your backend
        fetchUsers();
    }, []);
    
    const handleDeleteUser = async (userId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: "btn btn-success ",
            cancelButton: "btn btn-danger mr-3"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this! ",
            icon: "warning",
            reverseButtons: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://192.168.1.12:5000/ManageUser/deleteUser/${userId}`);
                    fetchUsers();
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Error deleting user:', error);
                    swalWithBootstrapButtons.fire({
                        title: "Error",
                        icon: "error"
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled deleting",
                    icon: "error"
                });
            }
        });
    };
    

    const navigateToCreateUser = () => {
        history.push('/CreateUser');
    };

    const navigateToEditUser = (user) => {
        // Navigate to UpdateUser component and pass user data as props
        history.push('/UpdateUser', { user });
    };

    const navigateToViewSession = (user) => {
        // Navigate to ViewSessionHistory component and pass charger data as props
        history.push(`/ViewSession/${user.username}`);
    };
    

    const navigateToViewWalletTransaction = (user) => {
        // Navigate to ViewSessionHistory component and pass charger data as props
        history.push(`/ViewWalletTransaction/${user.username}`);
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
            <div className="container-fluid  ">
                <main className="p-3 p-md-5  rounded position-relative">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title mt-5 ml-3"><b>Manage User</b></h3>
                    <button className="btn btn-primary mt-5" onClick={navigateToCreateUser}>Add User</button>
                </div>
                <div className="card mt-4">
                <div className="card-body">
                    <p className="card-description">
                    <code>User Information</code>
                    </p>
                    <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr className='text-center'>
                            <th>Sl.No</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Password</th>
                            <th>Wallet Balance</th>
                            <th>Is Admin</th>
                            <th>Session History</th>
                            <th>Wallet Transaction</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className='text-center'>
                                        <td className="py-1">{index + 1}</td>
                                        <td className="py-1">{user.username}</td>
                                        <td className="py-1">{user.phone}</td>
                                        <td className="py-1">{user.password}</td>
                                        <td className="py-1">{user.walletBalance}</td>
                                        <td className="py-1">
                                            {user.roleID === '1' ? 'User' : user.roleID === '2' ? 'Admin' : ''}
                                        </td>
                                        <td className="py-1">
                                            {/* Session History  Buttons */}
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-info me-2" onClick={() => navigateToViewSession(user)}>View</button>
                                            </div>
                                        </td>
                                        <td className="py-1">
                                            {/* Wallet Transaction Buttons */}
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-success me-2" onClick={() => navigateToViewWalletTransaction(user)}>View</button>
                                            </div>
                                        </td>
                                        <td className="py-1">
                                            {/* Edit and Delete Buttons */}
                                            <div className="btn-group" role="group">
                                                <button className="btn btn-warning me-2" onClick={() => navigateToEditUser(user)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center">
                                    <td colSpan="7">No Record Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </main>
            </div>
            </div>
            {children}
        </main>
        </div>
    </div>
    );
};

export default ManageUser;
