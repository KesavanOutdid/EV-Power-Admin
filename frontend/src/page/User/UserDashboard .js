import React from 'react';

const UserDashboard = ({ userInfo,  handleLogout}) => {

    return (
    <div className="container mt-5">
        <main className="p-5 bg-light rounded position-relative"><br/>
        <h2 className="mb-4">User Dashboard</h2>
        <div className="position-absolute top-0 end-0 m-4">
            <button className="btn btn-danger" onClick={handleLogout}>
            Logout
            </button>
        </div>
        <div className="card">
            <div className="card-body">
            <h4 className="card-title">
                Welcome, <span className="text-primary">{userInfo.username}</span>
            </h4>
            <p className="card-text">PhoneNumber: {userInfo.phone}</p>
            </div>
        </div>
        <hr className="my-4" />
        </main>
    </div>
    );
    };

export default UserDashboard;
