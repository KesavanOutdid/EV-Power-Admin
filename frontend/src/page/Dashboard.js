import React from 'react';
import AdminDashboard from './Admin/adminDashboard';
import UserDashboard from "./User/UserDashboard "; 

const Dashboard = ({ userInfo, handleLogout }) => {
    const isAdmin = userInfo && userInfo.roleID === '2' ;
    return (
        <div>
            {isAdmin ? (
                <AdminDashboard userInfo={userInfo}  handleLogout={handleLogout} />
            ) : (
                <UserDashboard userInfo={userInfo} handleLogout={handleLogout} />
            )}
        </div>
    );
};

export default Dashboard;
