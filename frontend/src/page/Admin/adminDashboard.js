import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from '../../components/Slidebar/Sidebar';
import NavComponent from '../../components/Navbar/Nav';
import Widgets from '../../components/Widgets/widgets';

const AdminDashboard = ({ userInfo, handleLogout,children }) => {
    const [FaultedDevices, setFaultedDevices] = useState([]);
    const fetchFaultedDevices = async () => {
        try {
            const response = await axios.get('/Admin/ManageFaultedDevices');
            setFaultedDevices(response.data.FaultedDevices);
        } catch (error) {
            console.error('Error fetching chargers:', error);
        }
    };

    const handleReload = () => {
        const element = document.querySelector('.animatebutton');
        element.classList.add('animated', 'rotateIn');
    
        setTimeout(function() {
            element.classList.remove('rotateIn');
        }, 1000);
    
        fetchFaultedDevices();
    };
    

    useEffect(() => {
        // Fetch the list of chargers from your backend
        fetchFaultedDevices();
    }, []);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 mt-4">
                <div className="container-fluid mt-5  ">
                    <h2>Welcome <strong className='text-primary'>{userInfo.username}</strong>,</h2>
                    <p>Monitor and manage user  accounts.</p><hr className="fw-bold" />
                    {/* Widgets */}
                        <Widgets/>
                        <hr/>
                        <main className=" mt- rounded position-relative">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="card-title mt-5 ml-3"><b>Device List</b>
                            <button
                                onClick={handleReload}
                                className="btn btn-outline-info rounded-circle ml-2 mb-1 p-2 animate__animated animate__rotateIn animatebutton"
                                style={{ border: 'none' }}
                            >
                                <i className="fa-solid fa-arrows-rotate"></i>
                            </button>

                            </h3>
                        </div>
                        <div className="card mt-4">
                                <div className="card-body shadow">
                                    <p className="card-description">
                                    <code>Faulted Device Information</code>
                                    </p>
                                    <div className="table-responsive">
                                    <table className="table table-striped">
                                    <thead>
                                        <tr className='text-center'>
                                            <th>Sl.No</th>
                                            <th>Device ID</th>
                                            <th>Status</th>
                                            <th>Client IP</th>
                                            <th>Error Code</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {FaultedDevices.length > 0 ? (
                                        FaultedDevices
                                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
                                            .map((Device, index) => (
                                                <tr key={Device._id} className="text-center">
                                                    <td className="py-1 p-4">{index + 1}</td>
                                                    <td className="py-1">{Device.chargerID}</td>
                                                    <td className="py-1 text-danger">{Device.status}</td>
                                                    <td className="py-1">{Device.clientIP}</td>
                                                    <td className="py-1 text-danger">{Device.errorCode}</td>
                                                    <td className="py-1">
                                                        {Device.timestamp ? new Date(Device.timestamp).toLocaleString('en-US', options) : 'Data not found'}
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr className="text-center">
                                            <td colSpan="8">No Record Found</td>
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

export default AdminDashboard;
