/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const ChargerList = ({ userInfo, handleLogout, children }) => {
    const [chargers, setChargers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    const fetchChargers = async () => {
        try {
            const response = await axios.get('/Admin/ManageCharger');
            setChargers(response.data.chargers);
        } catch (error) {
            console.error('Error fetching chargers:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of chargers from your backend
        fetchChargers();
    }, []);

    const handleDeleteCharger = async (chargerId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-3',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                reverseButtons: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                showCancelButton: true,

            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/Admin/ManageCharger/deleteCharger/${chargerId}`);
                        fetchChargers();
                        swalWithBootstrapButtons.fire({
                            title: 'Deleted!',
                            icon: 'success',
                        });
                    } catch (error) {
                        console.error('Error deleting charger:', error);
                        swalWithBootstrapButtons.fire({
                            title: 'Error',
                            icon: 'error',
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: 'Cancelled deleting',
                        icon: 'error',
                    });
                }
            });
    };

    const navigateToCreateCharger = () => {
        history.push('/CreateCharger');
    };

    const navigateToEditCharger = (charger) => {
        // Navigate to UpdateCharger component and pass charger data as props
        history.push('/UpdateCharger', { charger });
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
                <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-9 px-md-4 bg-light  content-wrapper">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
                        <div className="container-fluid ">
                            <main className="p-3 p-md-5 bg-light rounded position-relative">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="card-title mt-5 ml-3">
                                        <b>Manage Charger</b>
                                    </h3>
                                        <button
                                            className="btn btn-primary mt-5 ms-2 shadow"
                                            onClick={navigateToCreateCharger}
                                        >
                                            Add Device
                                        </button>
                                </div>
                                <div className="card mt-4">
                                    <div className="card-body shadow">
                                    <p className="card-description d-flex align-items-center">
                                            <code>Charger Information</code>
                                            <input
                                            type="text"
                                            className="form-control col-lg-3 col-md-6 col-sm-12 ml-auto"
                                            placeholder="Search by device ID, tag ID, model, type, etc..."
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
                                                        <th>Tag ID</th>
                                                        <th>Model</th>
                                                        <th>Type</th>
                                                        <th>Current Phase</th>
                                                        <th>Gun Connector</th>
                                                        <th>Max Current</th>
                                                        <th>Max Power</th>
                                                        <th>Socket Count</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredChargers.length > 0 ? (
                                                        filteredChargers.map((charger, index) => (
                                                            <tr key={charger._id} className="text-center">
                                                                <td className="py-1">{index + 1}</td>
                                                                <td className="py-1">{charger.ChargerID}</td>
                                                                <td className="py-1">{charger.ChargerTagID}</td>
                                                                <td className="py-1">{charger.charger_model}</td>
                                                                <td className="py-1">{charger.charger_type}</td>
                                                                <td className="py-1">{charger.current_phase}</td>
                                                                <td className="py-1">{charger.gun_connector}</td>
                                                                <td className="py-1">{charger.max_current}</td>
                                                                <td className="py-1">{charger.max_power}</td>
                                                                <td className="py-1">{charger.socket_count}</td>
                                                                <td className="py-1">
                                                                    {/* Edit and Delete Buttons */}
                                                                    <div className="btn-group" role="group">
                                                                        <button
                                                                            className="btn btn-warning me-2"
                                                                            onClick={() => navigateToEditCharger(charger)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() => handleDeleteCharger(charger._id)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className="text-center">
                                                            <td colSpan="11">No Record Found</td>
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

export default ChargerList;
