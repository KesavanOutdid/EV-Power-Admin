import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../../components/Slidebar/Sidebar';
import NavComponent from '../../../../components/Navbar/Nav';

const ViewSession = ({ userInfo, handleLogout, children }) => {
    const [chargers, setChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();
    const location = useLocation();
    const username = location.pathname.split('/').pop(); // Extracting chargerID from URL



    useEffect(() => {
        const fetchChargersSession = async () => {
            try {
                const response = await axios.get(`/Admin/ManageUser/ViewSession/${username}`);
                setChargers(response.data.chargers);
            } catch (error) {
                console.error('Error fetching chargers:', error);
            }
        };
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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredChargers = chargers.filter((charger) =>
        Object.values(charger)
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                {/* Navbar */}
                <NavComponent userInfo={userInfo} handleLogout={handleLogout} />

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-9 px-md-4 bg-light  content-wrapper">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                        <div className="container-fluid ">
                            <main className="p-3 p-md-5 bg-light rounded position-relative">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="card-title mt-5 ">
                                        <b>Session History</b>
                                    </h3>
                                    <button className="btn btn-info shadow text-white mt-4" onClick={() => history.goBack()}>
                                        Go Back
                                    </button>
                                </div>
                                <h4 className="card-title mt-5 ">
                                    <b>
                                        Username : <strong className="text-primary">{username}</strong>
                                    </b>
                                </h4>
                                <div className="card mt-4">
                                    <div className="card-body shadow">
                                    <p className="card-description d-flex align-items-center">
                                            <code>Charging Session History Information</code>
                                            <input
                                                type="text"
                                                className="form-control col-lg-3 col-md-6 col-sm-12 ml-auto"
                                                placeholder="Search by charger ID, session ID, unit consumed, price, start time, stop time..."
                                                value={searchQuery}
                                                onChange={handleSearch}
                                            />
                                        </p>
                                        <div className="table-responsive" style={{ maxHeight: '360px', overflowY: 'scroll' }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Sl.No</th>
                                                        <th>Device ID</th>
                                                        <th>Charging SessionID</th>
                                                        <th>Unit Consumed</th>
                                                        <th>Price</th>
                                                        <th>Start Time</th>
                                                        <th>Stop Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="pt-4">
                                                    {filteredChargers.length > 0 ? (
                                                        filteredChargers
                                                            .sort(
                                                                (a, b) => new Date(b.StopTimestamp) - new Date(a.StopTimestamp)
                                                            )
                                                            .map((charger, index) => (
                                                                <tr key={charger._id} className="text-center">
                                                                    <td className="py-1 p-4">{index + 1}</td>
                                                                    <td className="py-1">{charger.ChargerID}</td>
                                                                    <td className="py-1">{charger.ChargingSessionID}</td>
                                                                    <td className="py-1">{charger.Unitconsumed}</td>
                                                                    <td className="py-1">Rs. {charger.price}</td>
                                                                    <td className="py-1">
                                                                        {charger.StartTimestamp
                                                                            ? new Date(charger.StartTimestamp).toLocaleString(
                                                                                  'en-US',
                                                                                  options
                                                                              )
                                                                            : 'Data not found'}
                                                                    </td>
                                                                    <td className="py-1">
                                                                        {charger.StopTimestamp
                                                                            ? new Date(charger.StopTimestamp).toLocaleString(
                                                                                  'en-US',
                                                                                  options
                                                                              )
                                                                            : 'Data not found'}
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

export default ViewSession;
