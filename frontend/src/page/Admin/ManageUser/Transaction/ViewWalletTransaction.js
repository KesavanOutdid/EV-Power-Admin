/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../../components/Slidebar/Sidebar';
import NavComponent from '../../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const ViewWalletTransaction = ({ userInfo, handleLogout, children }) => {
    const [Transactions, setTransactions] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const username = location.pathname.split('/').pop(); // Extracting chargerID from URL

    const fetchChargersSession = async () => {
        try {
        const response = await axios.get(`http://192.168.1.12:5000/ManageUser/ViewWalletTransaction/${username}`);
        setTransactions(response.data.Transactions);

        } catch (error) {
        console.error('Error fetching Data:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of chargers from your backend
        fetchChargersSession();
    }, [username]);

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
                <div className="container-fluid ">
                <main className="p-3 p-md-5 bg-light rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title mt-5 ">
                        <b>Transaction History</b>
                    </h3>
                    <button className="btn btn-info text-white mt-4" onClick={() => history.goBack()}>
                        Go Back
                    </button>
                    </div>
                    <h4 className="card-title mt-5 ml-2 ">
                    <b>
                        User Name : <strong className="text-primary">{username}</strong>
                    </b>
                    </h4>
                    <div className="card mt-4">
                    <div className="card-body">
                        <p className="card-description">
                        <code>Wallet Transaction Details</code>
                        </p>
                        <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr className="text-center">
                                <th>Sl.No</th>
                                <th>Status</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody className='pt-4'>
                            {Transactions && Transactions.length > 0 ? (
                                Transactions
                                        .sort((a, b) => new Date(b.date_time) - new Date(a.date_time)) 
                                        .map((Transaction, index) => (
                                            <tr key={Transaction._id} className="text-center">
                                                <td className="py-1 p-4">{index + 1}</td>
                                                {/* <td className="py-1">{charger.user}</td> */}
                                                <td className="py-1">{Transaction.Status}</td>
                                                <td className="py-1">
                                                    {Transaction.Status === 'Credited' ? (
                                                        <span className="text-success"> + Rs. {Transaction.price}
                                                    </span>
                                                    ) : (
                                                        <span className="text-danger">-  Rs. {Transaction.price}
                                                    </span>
                                                    )}
                                                    </td>
                                                    <td className="py-1">
                                                    {Transaction.date_time ? new Date(Transaction.date_time).toLocaleString('en-US', options) : 'Data not found'}
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

export default ViewWalletTransaction;
