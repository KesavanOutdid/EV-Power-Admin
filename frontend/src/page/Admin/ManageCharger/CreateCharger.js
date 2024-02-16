/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Slidebar/Sidebar';
import NavComponent from '../../../components/Navbar/Nav';
import Swal from 'sweetalert2';


const CreateUser = ({userInfo, handleLogout,children }) => {
    const [newCharger, setNewCharger] = useState({
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
    });
    const history = useHistory();


    const validateForm = () => {
        const {
            ChargerID,
            ChargerTagID,
            charger_model,
            charger_type,
            current_phase,
            gun_connector,
            max_current,
            max_power,
            socket_count
        } = newCharger;
        
        if (!ChargerID || !ChargerTagID || !charger_model || !charger_type || !current_phase || !gun_connector || !max_current || !max_power || !socket_count) {
            document.getElementById('validationMessage').innerText = 'Please fill out all required fields.';
            return false;
        }

        // Additional validation criteria can be added here
        document.getElementById('validationMessage').innerText = '';
        return true;
    };

    const handleCreateCharger = async () => {
        try {
            const newChargerData = {
                ChargerID: newCharger.ChargerID || '',
                transactionId: newCharger.transactionId || '',
                ChargerTagID: newCharger.ChargerTagID || '',
                charger_model: newCharger.charger_model || '',
                charger_type: newCharger.charger_type || '',
                current_phase: newCharger.current_phase || '',
                gun_connector: newCharger.gun_connector || '',
                max_current: newCharger.max_current || '',
                max_power: newCharger.max_power || '',
                socket_count: newCharger.socket_count || '',
                current_or_active_user: newCharger.current_or_active_user || '',
                ip: newCharger.ip || '',
            };
    
            // Validate the form
            if (validateForm()) {
                console.log('Creating Charger:', newChargerData);
                await axios.post('http://192.168.1.12:5000/ChargerList/chargers', newChargerData);
                setNewCharger({
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
                });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:"Charger has been created!",
                    showConfirmButton: false,
                    timer: 1500
                });
                history.goBack();
            }
        } catch (error) {
            console.error('Error creating user:', error);
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
            <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
            <div className="container-fluid ">
                    <main className="p-3 p-md-5 bg-light rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title mt-5 "><b>Create Device</b></h3>
                        <button className="btn btn-info text-white mt-4"  onClick={() => history.goBack()} >Go Back</button>
                    </div>
                    <section className="CreateUser">
                        <form className="contact-form row">
                            <div className="form-field col-lg-12">
                                <label htmlFor="ChargerID" className="form-label">Device ID</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    id="ChargerID"
                                    required
                                    value={newCharger.ChargerID}
                                    onChange={(e) => setNewCharger({ ...newCharger, ChargerID: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="ChargerTagID" className="form-label">Tag ID</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="ChargerTagID"
                                    value={newCharger.ChargerTagID}
                                    onChange={(e) => setNewCharger({ ...newCharger, ChargerTagID: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="charger_model" className="form-label">Model</label>                                    
                                <input
                                        type="text"
                                        className="input-text js-input"
                                        required
                                        id="charger_model"
                                        value={newCharger.charger_model}
                                        onChange={(e) => setNewCharger({ ...newCharger, charger_model: e.target.value })}
                                    />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="charger_type" className="form-label">Type</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="charger_type"
                                    value={newCharger.charger_type}
                                    onChange={(e) => setNewCharger({ ...newCharger, charger_type: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="current_phase" className="form-label">Current Phase</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="current_phase"
                                    value={newCharger.current_phase}
                                    onChange={(e) => setNewCharger({ ...newCharger, current_phase: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="gun_connector" className="form-label">Gun Connector</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="gun_connector"
                                    value={newCharger.gun_connector}
                                    onChange={(e) => setNewCharger({ ...newCharger, gun_connector: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_current" className="form-label">Max Current</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="max_current"
                                    value={newCharger.max_current}
                                    onChange={(e) => setNewCharger({ ...newCharger, max_current: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_power" className="form-label">Max Power</label>
                                <input
                                    type="text"
                                    className="input-text js-input"                          
                                    required
                                    id="max_power"
                                    value={newCharger.max_power}
                                    onChange={(e) => setNewCharger({ ...newCharger, max_power: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="socket_count" className="form-label">Socket Count</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="socket_count"
                                    value={newCharger.socket_count}
                                    onChange={(e) => setNewCharger({ ...newCharger, socket_count: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                <div id="validationMessage" className="text-danger mb-2"></div>
                                <button type="button" className="btn btn-primary" onClick={handleCreateCharger}>Create Device</button>
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

export default CreateUser;
