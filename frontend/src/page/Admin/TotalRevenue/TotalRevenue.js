import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';

const TotalRevenue = ({ userInfo, handleLogout, children }) => {
    const [totalRevenue, setTotalRevenue] = useState('');
    const [revenue, setRevenue] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTotalRevenue = async () => {
        try {
            const response = await axios.get('/Admin/ManageTotalRevenue');
            const { TotalRevenue, Revenue } = response.data;
            setRevenue(Revenue);
            setTotalRevenue(TotalRevenue);
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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRevenue = revenue.filter(
        (revenue) =>
            Object.values(revenue)
                .join(' ')
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid bg-light">
            <div className="row ">
                {/* Navbar */}
                <NavComponent userInfo={userInfo} handleLogout={handleLogout} />

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-9 px-md-4 bg-light  content-wrapper">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                        <div className="container-fluid ">
                            <main className="p-3 p-md-5  rounded position-relative">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="card-title mt-5 ml-3"><b>Total Revenue</b></h3>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-4 ">
                                        <div className="card text-white bg-flat-color-1 bg-primary mt-2 shadow">
                                            <div className="card-body">
                                                <div className="card-left pt-1 float-left">
                                                    <h3 className="mb-0 fw-r">
                                                        <span className="currency float-left mr-1">Rs. </span>
                                                        <span className="count">{totalRevenue}</span>
                                                    </h3>
                                                    <p className="text-light mt-1 m-0">Total Revenue</p>
                                                </div>
                                                <div className="card-right float-right text-right ">
                                                    <i className="bi bi-graph-up fa-3x"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-4">
                                    <div className="card-body shadow">
                                    <p className="card-description d-flex align-items-center">
                                            <code>Revenue Information</code>
                                            <input
                                            type="text"
                                            className="form-control col-lg-3 col-md-6 col-sm-12 ml-auto"
                                            placeholder="Search by user, amount, transaction ID, etc..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        </p>
                                        <div className="table-responsive" style={{ maxHeight: '375px', overflowY: 'scroll' }}>
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
                                                    {filteredRevenue.length > 0 ? (
                                                        filteredRevenue.map((revenue, index) => (
                                                            <tr key={revenue._id} className="text-center">
                                                                <td className="py-1 p-4">{index + 1}</td>
                                                                <td className="py-1">{revenue.user}</td>
                                                                <td className="py-1">{revenue.RechargeAmt}</td>
                                                                <td className="py-1">{revenue.transactionId}</td>
                                                                <td className="py-1">{revenue.responseCode}</td>
                                                                <td className="py-1">
                                                                    {revenue.date_time ? new Date(revenue.date_time).toLocaleString('en-US', options) : 'Data not found'}
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
