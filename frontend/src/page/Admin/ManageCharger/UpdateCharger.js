/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';


const UpdateCharger = ({userInfo, handleLogout,children }) => {
    const [editingCharger, setEditingCharger] = useState({
        ChargerID: '',
        transactionId: '',
        ChargerTagID: '',
        charger_model: '',
        charger_type: '',
        current_phase: '',
        gun_connector: '',
        max_current: '',
        max_power: '',
        socket_count: '',
        current_or_active_user: '',
        ip: '',
        lat: '',
        long: '',
    });
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Extract user data from location state
        const { charger } = location.state;
        if (charger) {
            setEditingCharger(charger);
        }
    }, [location]);
    
    const handleEditCharger = async () => {
        try {
            await axios.put(`/Admin/ManageCharger/updateCharger/${editingCharger._id}`, editingCharger);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Chargerlist updated successfully",
                showConfirmButton: false,
                timer: 1500,

            });
            history.goBack();
        } catch (error) {
            console.error('Error updating charger:', error);
        }
    };

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
                    <main className="p-3 p-md-5 bg-light rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title mt-5 "><b>Update Device</b></h3>
                        <button className="btn shadow btn-info text-white mt-4"  onClick={() => history.goBack()} >Go Back</button>
                    </div>
                    <section className="CreateUser">
                        <form className="contact-form row">
                            <div className="form-field col-lg-12">
                                <label htmlFor="ChargerID" className="form-label">Device ID</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    id="ChargerID"
                                    readOnly
                                    required
                                    value={editingCharger.ChargerID}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, ChargerID: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="ChargerTagID" className="form-label">Tag ID</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="ChargerTagID"
                                    value={editingCharger.ChargerTagID}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, ChargerTagID: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="charger_model" className="form-label">Model</label>                                    
                                <input
                                        type="text"
                                        className="input-text js-input"
                                        required
                                        id="charger_model"
                                        value={editingCharger.charger_model}
                                        onChange={(e) => setEditingCharger({ ...editingCharger, charger_model: e.target.value })}
                                    />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="charger_type" className="form-label">Type</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="charger_type"
                                    value={editingCharger.charger_type}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, charger_type: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="current_phase" className="form-label">Current Phase</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="current_phase"
                                    value={editingCharger.current_phase}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, current_phase: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="gun_connector" className="form-label">Gun Connector</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="gun_connector"
                                    value={editingCharger.gun_connector}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, gun_connector: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_current" className="form-label">Max Current</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="max_current"
                                    value={editingCharger.max_current}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, max_current: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_power" className="form-label">Max Power</label>
                                <input
                                    type="text"
                                    className="input-text js-input"                          
                                    required
                                    id="max_power"
                                    value={editingCharger.max_power}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, max_power: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="socket_count" className="form-label">Socket Count</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="socket_count"
                                    value={editingCharger.socket_count}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, socket_count: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="Latitude" className="form-label">Latitude</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="Latitude"
                                    value={editingCharger.lat}
                                    onChange={(e) => setEditingCharger({ ...editingCharger, lat: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="Longitude" className="form-label">Longitude</label>                                    
                                <input
                                        type="text"
                                        className="input-text js-input"
                                        required
                                        id="Longitude"
                                        value={editingCharger.long}
                                        onChange={(e) => setEditingCharger({ ...editingCharger, long: e.target.value })}
                                    />
                            </div>
                            <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                <div id="validationMessage" className="text-danger mb-2"></div>
                                <button type="button" className="btn btn-primary shadow" onClick={handleEditCharger}>Update Device</button>
                            </div>
                        </form>
                    </section>
                    </main>
                </div>
                </div>
                {children}
            </main>
            </div>
        </div>
        );
};

export default UpdateCharger ;
