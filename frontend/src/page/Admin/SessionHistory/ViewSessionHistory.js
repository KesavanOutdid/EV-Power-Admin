/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';

const ViewSessionHistory = ({ userInfo, handleLogout, children }) => {
    const [chargers, setChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();
    const location = useLocation();
    const chargerID = location.pathname.split('/').pop(); // Extracting chargerID from URL

    const fetchChargers = async () => {
        try {
            const response = await axios.get(`/ManageSessionHistory/ViewSessionHistory/${chargerID}`);
            setChargers(response.data.chargers);
        } catch (error) {
            console.error('Error fetching chargers:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of chargers from your backend
        fetchChargers();
    }, [chargerID]);

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

    const filteredChargers = chargers.filter(
        (charger) =>
            Object.values(charger)
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
                <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                        <div className="container-fluid ">
                            <main className="p-3 p-md-5 bg-light rounded position-relative">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="card-title mt-5 ">
                                        <b>Session History</b>
                                    </h3>
                                    <button className="btn btn-info text-white shadow mt-4"  onClick={() => history.goBack()} >Go Back</button>
                                </div>
                                <h4 className="card-title mt-5 ">
                                    <b>
                                        Device ID: <strong className="text-primary">{chargerID}</strong>
                                    </b>
                                </h4>
                                <div className="card mt-4">
                                    <div className="card-body shadow">
                                    <p className="card-description d-flex align-items-center">
                                            <code>Charging Session History Information</code>
                                            <input
                                            type="text"
                                            className="form-control col-lg-3 col-md-6 col-sm-12 ml-auto"
                                            placeholder="Search by user, device ID, session ID, etc..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Sl.No</th>
                                                        <th>User</th>
                                                        <th>Device ID</th>
                                                        <th>Charging SessionID</th>
                                                        <th>Unit Consumed</th>
                                                        <th>Price</th>
                                                        <th>Start Time</th>
                                                        <th>Stop Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='pt-4'>
                                                    {filteredChargers.length > 0 ? (
                                                        filteredChargers.map((charger, index) => (
                                                            <tr key={charger._id} className="text-center">
                                                                <td className="py-1 p-4">{index + 1}</td>
                                                                <td className="py-1">{charger.user}</td>
                                                                <td className="py-1">{charger.ChargerID}</td>
                                                                <td className="py-1">{charger.ChargingSessionID}</td>
                                                                <td className="py-1">{charger.Unitconsumed}</td>
                                                                <td className="py-1">{charger.price}</td>
                                                                <td className="py-1">
                                                                    {charger.StartTimestamp ? new Date(charger.StartTimestamp).toLocaleString('en-US', options) : 'Data not found'}
                                                                </td>
                                                                <td className="py-1">
                                                                    {charger.StopTimestamp ? new Date(charger.StopTimestamp).toLocaleString('en-US', options) : 'Data not found'}
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

export default ViewSessionHistory;
