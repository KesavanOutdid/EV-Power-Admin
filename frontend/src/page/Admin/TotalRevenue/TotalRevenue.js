import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const TotalRevenue = ({userInfo, handleLogout,children  }) => {
    const [TotalRevenue, setTotalRevenue] = useState('');
    const [Revenue, setRevenue] = useState([]);
    const fetchTotalRevenue = async () => {
        try {
            const response = await axios.get('http://192.168.1.12:5000/ManageTotalRevenue');
            console.log("response", response)
            const { TotalRevenue, Revenue } = response.data;
            setRevenue(Revenue);
            setTotalRevenue(TotalRevenue);
            console.log("Total Revenue:", TotalRevenue);
        } catch (error) {
            console.error('Error fetching TotalRevenue:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of TotalRevenue from your backend
        fetchTotalRevenue();
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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                <div className="container-fluid  ">
                    <main className="p-3 p-md-5  rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title mt-5 ml-3"><b>Total Revenue</b></h3>
                    </div>
                    <div className="row">
                            <div className="col-sm-6 col-lg-3 ">
                                <div className="card text-white bg-flat-color-1 bg-primary mt-2 shadow">
                                    <div className="card-body">
                                        <div className="card-left pt-1 float-left">
                                            <h3 className="mb-0 fw-r">
                                                <span className="currency float-left mr-1">$</span>
                                                <span className="count">{TotalRevenue}</span>
                                            </h3>
                                            <p className="text-light mt-1 m-0">Revenue</p>
                                        </div>
                                        <div className="card-right float-right text-right ">
                                        <i className="bi bi-graph-up fa-3x"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="card mt-4">
                            <div className="card-body">
                                <p className="card-description">
                                <code>Revenue Information</code>
                                </p>
                                <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr className='text-center'>
                                        <th>Sl.No</th>
                                        <th>User</th>
                                        <th>Recharged Amount</th>
                                        <th>Transaction ID</th>
                                        <th>Response Code</th>
                                        <th>Time</th>
                                    </tr>
                                    </thead>
                                    <tbody className='pt-4'>
                                {Revenue.length > 0 ? (
                                    Revenue
                                        .sort((a, b) => new Date(b.date_time) - new Date(a.date_time)) 
                                        .map((Revenue, index) => (
                                            <tr key={Revenue._id} className="text-center">
                                                <td className="py-1 p-4">{index + 1}</td>
                                                <td className="py-1">{Revenue.user}</td>
                                                <td className="py-1">{Revenue.RechargeAmt}</td>
                                                <td className="py-1">{Revenue.transactionId}</td>
                                                <td className="py-1">{Revenue.responseCode}</td>
                                                <td className="py-1">
                                                    {Revenue.date_time ? new Date(Revenue.date_time).toLocaleString('en-US', options) : 'Data not found'}
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

export default TotalRevenue;
