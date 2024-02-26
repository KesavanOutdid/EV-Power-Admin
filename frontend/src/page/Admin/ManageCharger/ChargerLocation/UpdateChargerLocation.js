/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../../components/Slidebar/Sidebar';
import NavComponent from '../../../../components/Navbar/Nav';
import Swal from 'sweetalert2';

const UpdateChargerLocation = ({ userInfo, handleLogout, children }) => {
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
    const [userLocation, setUserLocation] = useState(null);
    const [chargers, setChargers] = useState([]);

    const history = useHistory();
    const location = useLocation();
    const chargerID = location.pathname.split('/').pop(); // Extracting chargerID from URL

    useEffect(() => {
      // Extract user data from location state
      const { charger } = location.state;
      if (charger) {
        console.log('Extracting Charger data', charger);
        setEditingCharger(charger);
      }
    }, [location]);

    const fetchChargers = async () => {
      try {
        const response = await axios.get(`/Admin/ManageCharger/ViewChargerLocation/${chargerID}`);
        setChargers(response.data.chargers);
      } catch (error) {
        console.error('Error fetching chargers:', error);
      }
    };

    useEffect(() => {
      // Fetch the list of chargers from your backend
      fetchChargers();
    }, [chargerID]);

    const handleEditCharger = async () => {
      try {
        await axios.put(`/Admin/ManageCharger/updateCharger/${editingCharger._id}`, editingCharger);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'ChargerLocation updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        history.goBack();
      } catch (error) {
        console.error('Error updating charger:', error);
      }
    };

    const renderGoogleMap = () => {
      // Check if the Google Maps script is already loaded
      if (!window.google) {
        // Load Google Maps API
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBKNCCoaNMYRBi4xnYQ-RXzIe9OQX8800Q&libraries=places';
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        // If already loaded, directly call initMap
        initMap();
      }
    };

    const initMap = () => {
      // Create a new map centered at the user's location
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 15,
      });

      // Place a marker at the user's location
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
      });
    };

    const fetchUserLocation = () => {
      let timerInterval;
    
      Swal.fire({
        title: "Fetching Location",
        html: "Fetching your current location",
        timer: 2000, // Adjusted to wait for 2 seconds
        timerProgressBar: true,
        didOpen: async () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
    
          if (timer) {
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          } else {
            console.error("Timer element not found in the DOM");
          }
    
          try {
            // Fetch user's current location using Geolocation API
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
    
            const { latitude, longitude } = position.coords;
    
            setUserLocation({ lat: latitude, lng: longitude });
    
            // Update latitude and longitude in the state
            setEditingCharger({
              ...editingCharger,
              lat: latitude.toString(),
              long: longitude.toString(),
            });
    
            console.log('lat:', latitude, 'lng:', longitude);
          } catch (error) {
            console.error('Error getting user location:', error.message);
          } finally {
            clearInterval(timerInterval);
            // Add a delay of 2 seconds before closing the Swal modal
            setTimeout(() => {
              Swal.close();
            }, 1000);
          }
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    };
    
    

    const fetchUserLocationDefault = () => {
      // Check if chargers array is not empty and has at least one element
      if (chargers && chargers.length > 0) {
        const latitude = parseFloat(chargers[0].lat);
        const longitude = parseFloat(chargers[0].long);

        if (!isNaN(latitude) && !isNaN(longitude)) {
          console.log('Fetching location', latitude, ',', longitude);
          setUserLocation({ lat: latitude, lng: longitude });
        } else {
          console.error('Invalid latitude or longitude values');
        }
      } else {
        console.log('Chargers is empty or loading');
      }
    };

    useEffect(() => {
      // Fetch user's location when the component mounts
      fetchUserLocationDefault();
    }, [chargers]);

    useEffect(() => {
      // Render Google Map once userLocation is available
      if (userLocation) {
        renderGoogleMap();
      }
    }, [userLocation]);

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
                  <h3 className="card-title mt-5 ">
                    <b>Update Device Location </b>
  
                  </h3>
                  <button className="btn shadow btn-info text-white mt-4" onClick={() => history.goBack()}>
                    Go Back
                  </button>
                </div>
                <h4 className="card-title mt-4 ">
                  <b>
                    Device ID: <strong className="text-primary">{editingCharger.ChargerID}</strong>
                  </b>
                </h4>
                <section className="CreateUser">
                  <form className="contact-form row">
                    <div className="form-field col-lg-3">
                      <label htmlFor="Latitude" className="form-label">
                        Latitude
                      </label>
                      <input
                        type="text"
                        className="input-text js-input"
                        required
                        id="Latitude"
                        value={editingCharger.lat}
                        onChange={(e) => setEditingCharger({ ...editingCharger, lat: e.target.value })}
                      />
                    </div>
                    <div className="form-field col-lg-3">
                      <label htmlFor="Longitude" className="form-label">
                        Longitude
                      </label>
                      <input
                        type="text"
                        className="input-text js-input"
                        required
                        id="Longitude"
                        value={editingCharger.long}
                        onChange={(e) => setEditingCharger({ ...editingCharger, long: e.target.value })}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-dark col-lg-1 col-md-2 col-sm-3 col-12 h-25 mr-3 shadow mt-lg-5" 
                      title='Fetch Current Location' 
                      onClick={fetchUserLocation}
                    >
                      <i className="fas fa-map-marker-alt "></i> 
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-success col-lg-2 col-md-4 col-sm-9 col-12 h-25 shadow mt-3 pb-3 mt-lg-5 mb-4" 
                      onClick={handleEditCharger}
                    >
                      Update Location
                    </button>
                      <div className="mt-2" style={{ width: '100%', height: '400px' }}>
                        {/* The div element for the map */}
                        <div id="map" style={{ height: '100%', width: '100%' }}></div>
                      </div>
                    <div className="form-field col-lg-12 d-flex flex-column align-items-center">

                    </div>
                  </form>
                  {/* <Location /> */}
                  <div className="d-flex col-lg-12 flex-column align-items-center">

                    {userLocation ? (
                      <div className="mt-2" style={{ width: '100%', height: '400px' }}>
                        {/* The div element for the map */}
                        <div id="map" style={{ height: '100%', width: '100%' }}></div>
                      </div>
                    ) : (
                      <div className="mt-2" style={{ width: '100%', height: '400px' }}>
                        {/* The div element for the map */}
                        <div id="map" style={{ height: '100%', width: '100%' }}></div>
                      </div>
                    )}
                  </div>
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

export default UpdateChargerLocation;
