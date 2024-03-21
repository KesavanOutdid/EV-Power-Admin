/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
        lat: '',
        long: '',
        ShortDescription: '',
        infrastructure:'',
        AssignedUser: '',

    });
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/Admin/ManageUser');
            console.log(response.data)
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of users from your backend
        fetchUsers();
    }, []);
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
            socket_count,
            lat,
            long,
            ShortDescription,
            infrastructure,
            // AssignedUser,
        } = newCharger;
        
        if (!ChargerID || !ChargerTagID || !charger_model || !charger_type || !current_phase || !gun_connector || !max_current || !max_power || !socket_count || !lat || !long || !infrastructure || !ShortDescription ) {
            document.getElementById('validationMessage').innerText = 'Please fill out all required fields.';
            return false;
        }

        // Additional validation criteria can be added here
        document.getElementById('validationMessage').innerText = '';
        return true;
    };

    const handleCreateCharger = async (e) => {
        e.preventDefault();
        try {
            const newChargerData = {
                ChargerID: newCharger.ChargerID,
                transactionId: newCharger.transactionId,
                ChargerTagID: newCharger.ChargerTagID,
                charger_model: newCharger.charger_model,
                charger_type: newCharger.charger_type,
                current_phase: newCharger.current_phase,
                gun_connector: newCharger.gun_connector,
                max_current: newCharger.max_current,
                max_power: newCharger.max_power,
                socket_count: newCharger.socket_count,
                current_or_active_user: newCharger.current_or_active_user,
                ip: newCharger.ip,
                lat: newCharger.lat,
                long: newCharger.long,
                ShortDescription: newCharger.ShortDescription,
                infrastructure: newCharger.infrastructure,
                AssignedUser: newCharger.AssignedUser || null,

            };
            // Validate the form
            // if (validateForm()) {
                console.log('Creating Charger:', newChargerData);
                await axios.post('/Admin/ChargerList/chargers', newChargerData);
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
                    lat:'',
                    long:'',
                    ShortDescription: '',
                    infrastructure:'',
                    AssignedUser: '',

                });
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title:"Charger has been created!",
                    showConfirmButton: false,
                    timer: 1500,

                });
                history.goBack();
            // }
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
            <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-9 px-md-4 bg-light  content-wrapper">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 ">
            <div className="container-fluid ">
                    <main className="p-3 p-md-5 bg-light rounded position-relative">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title mt-5 "><b>Create Device</b></h3>
                        <button className="btn btn-info text-white mt-4 shadow"  onClick={() => history.goBack()} >Go Back</button>
                    </div>
                    <section className="CreateUser">
                        <form className="contact-form row"  onSubmit={handleCreateCharger}>
                            <div className="form-field col-lg-6">
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
                                    type="number"
                                    className="input-text js-input"
                                    required
                                    id="current_phase"
                                    value={newCharger.current_phase}
                                    onChange={(e) => setNewCharger({ ...newCharger, current_phase: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="gun_connector" className="form-label">Gun Connector</label>
                                <input
                                    type="number"
                                    className="input-text js-input"
                                    required
                                    id="gun_connector"
                                    value={newCharger.gun_connector}
                                    onChange={(e) => setNewCharger({ ...newCharger, gun_connector: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_current" className="form-label">Max Current</label>
                                <input
                                    type="number"
                                    className="input-text js-input"
                                    required
                                    id="max_current"
                                    value={newCharger.max_current}
                                    onChange={(e) => setNewCharger({ ...newCharger, max_current: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="max_power" className="form-label">Max Power</label>
                                <input
                                    type="number"
                                    className="input-text js-input"                          
                                    required
                                    id="max_power"
                                    value={newCharger.max_power}
                                    onChange={(e) => setNewCharger({ ...newCharger, max_power: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="socket_count" className="form-label">Socket Count</label>
                                <input
                                    type="number"
                                    className="input-text js-input"
                                    required
                                    id="socket_count"
                                    value={newCharger.socket_count}
                                    onChange={(e) => setNewCharger({ ...newCharger, socket_count: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="Latitude" className="form-label">Latitude</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    required
                                    id="Latitude"
                                    value={newCharger.lat}
                                    onChange={(e) => setNewCharger({ ...newCharger, lat: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="Longitude" className="form-label">Longitude</label>                                    
                                <input
                                        type="text"
                                        className="input-text js-input"
                                        required
                                        id="Longitude"
                                        value={newCharger.long}
                                        onChange={(e) => setNewCharger({ ...newCharger, long: e.target.value })}
                                    />
                            </div>
                            <div className="form-field col-lg-6">
                                <label htmlFor="ShortDescription" className="form-label">Location Short Description</label>
                                <input
                                    type="text"
                                    className="input-text js-input"
                                    id="ShortDescription"
                                    required
                                    value={newCharger.ShortDescription}
                                    onChange={(e) => setNewCharger({ ...newCharger, ShortDescription: e.target.value })}
                                />
                            </div>
                            <div className="form-field col-lg-6  ">
                            <label htmlFor="infrastructure" className="form-label">infrastructure</label>
                            <select
                                className="input-text js-input bg-light btn-outline-none mr-0 w-100"
                                id="infrastructure"
                                required
                                value={newCharger.infrastructure}
                                onChange={(e) => setNewCharger({ ...newCharger, infrastructure: parseInt(e.target.value) })}
                                style={{ width: '50%' }}                            >
                                <option value="" disabled>Select infrastructure</option>
                                <option  value={0}>Public</option>
                                <option   value={1}>Private</option>
                            </select>
                            </div>
                            {newCharger.infrastructure === 1 && (
                                <div className="form-field col-lg-6">
                                    <label htmlFor="AssignedUser" className="form-label">Assign to User</label>
                                    <select
                                        className="input-text js-input bg-light btn-outline-none mr-0 w-100"
                                        id="AssignedUser"                                        
                                        value={newCharger.AssignedUser}
                                        required={newCharger.infrastructure === 1} // Add required attribute conditionally
                                        onChange={(e) => setNewCharger({ ...newCharger, AssignedUser: e.target.value })}
                                    >
                                        <option value="" disabled>Select User</option>
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <option key={user._id} value={user.username}>{user.username}</option>
                                            ))
                                        ) : (
                                            <option disabled>No users found</option>
                                        )}
                                    </select>
                                </div>
                            )}

                            <div className="form-field col-lg-12 d-flex flex-column align-items-center">
                                <div id="validationMessage" className="text-danger mb-2"></div>
                                <button type="submit" className="btn btn-primary shadow">Create Device</button>
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
