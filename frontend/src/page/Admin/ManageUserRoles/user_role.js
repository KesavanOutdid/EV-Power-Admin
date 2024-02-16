import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const UserRole = ({userInfo, handleLogout,children  }) => {
  const [roles, setRoles] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://192.168.1.12:5000/ManageUserRoles');
      setRoles(response.data.roles);
    } catch (error) {
      console.error('Error fetching user roles:', error);
    }
  };

  const handleDeleteRole = async (roleID) => {
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
            await axios.delete(`http://192.168.1.12:5000/ManageUserRoles/deleteuserRoles/${roleID}`);
            fetchRoles();
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
        history.push('/CreateUserRoles');
    };
    const navigateToEditUser = (user) => {
        // Navigate to UpdateUser component and pass user data as props
    history.push('/UpdateUserRoles', { user });
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
                    <h3 className="card-title mt-5 ml-3"><b>Manage UserRoles</b></h3>
                    <button className="btn btn-primary mt-5" onClick={navigateToCreateUser}>Add Role</button>
                </div>
                <div className="card  ">
                <div className="card-body ">
                    <p className="card-description">
                    <code>User Roles</code>
                    </p>
                    <div className="table-responsive">
                    <table className="table table-striped">
                            <thead>
                                <tr className='text-center'>
                                    <th style={{ width: '%' }}>Sl.No</th>
                                    <th style={{ width: '%' }}>Role ID</th>
                                    <th style={{ width: '%' }}>Role Name</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length > 0 ? (
                                    roles.map((role, index) => (
                                        <tr key={role._id} className='text-center'>
                                            <td className="py-1">{index + 1}</td>
                                            <td className="py-1">{role.roleID}</td>
                                            <td className="py-1">{role.roleName}</td>
                                            <td className="py-1">
                                                {/* Edit and Delete Buttons */}
                                                <div className="btn-group" role="group">
                                                    <button className="btn btn-warning me-2" onClick={() => navigateToEditUser(role)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteRole(role._id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan="4">No Record Found</td>
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
export default UserRole;