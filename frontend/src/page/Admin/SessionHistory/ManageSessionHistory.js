import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';

const ManageSessionHistory = ({ userInfo, handleLogout, children }) => {
    const [chargers, setChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    const fetchChargers = async () => {
        try {
            const response = await axios.get('/ManageSessionHistory');
            setChargers(response.data.chargers);
        } catch (error) {
            console.error('Error fetching chargers:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of chargers from your backend
        fetchChargers();
    }, []);

    const navigateToViewCharger = (charger) => {
        // Navigate to ViewSessionHistory component and pass charger data as props
        history.push(`/ViewSessionHistory/${charger.ChargerID}`);
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
            <div className="row">
                {/* Navbar */}
                <NavComponent userInfo={userInfo} handleLogout={handleLogout} />

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                        <div className="container-fluid ">
                            <main className="p-3 p-md-5  rounded position-relative">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="card-title mt-5 ml-3">
                                        <b>Session History</b>
                                    </h3>
                                    </div>
                                <div className="card mt-4">
                                    <div className="card-body shadow">
                                    <p className="card-description d-flex align-items-center">
                                            <code>Charging Session History Information</code>
                                            <input
                                            type="text"
                                            className="form-control col-lg-3 col-md-6 col-sm-12 ml-auto"
                                            placeholder="Search by device ID, type, etc..."
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Sl.No</th>
                                                        <th>Device ID</th>
                                                        <th>Type</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredChargers.length > 0 ? (
                                                        filteredChargers.map((charger, index) => (
                                                            <tr key={charger._id} className="text-center">
                                                                <td className="py-1">{index + 1}</td>
                                                                <td className="py-1">{charger.ChargerID}</td>
                                                                <td className="py-1">{charger.charger_type}</td>
                                                                <td className="py-1">
                                                                    {/* View Button */}
                                                                    <div className="btn-group" role="group">
                                                                        <button
                                                                            className="btn btn-success me-2"
                                                                            onClick={() => navigateToViewCharger(charger)}
                                                                        >
                                                                            View
                                                                        </button>
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

export default ManageSessionHistory;
