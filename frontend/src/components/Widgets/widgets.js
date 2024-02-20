import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Widgets = ({ userInfo, handleLogout,children }) => {
    const [TotalRevenue, setTotalRevenue] = useState('');
    const [CurrentPrice, setCurrentPrice] = useState('');
    const [FaultedDeviceCount, setFaultedDeviceCount] = useState('');

    const fetchWidgets = async () => {
        try {
            const response = await axios.get('/ManageWidgets');
            console.log("response", response)
            const { TotalRevenue ,CurrentPrice,FaultedDeviceCount} = response.data;
            setTotalRevenue(TotalRevenue);
            setCurrentPrice(CurrentPrice);
            setFaultedDeviceCount(FaultedDeviceCount);
            console.log("Total Revenue:", TotalRevenue);
            console.log("Current Price :", CurrentPrice);
            console.log("Faulted Device Count:", FaultedDeviceCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch the list of TotalRevenue from your backend
        fetchWidgets();
    }, []);

return (
    <div className="row">
        <div className="col-sm-6 col-lg-4 ">
            <div className="card text-white bg-flat-color-1 bg-primary mt-2 shadow">
                <div className="card-body">
                    <div className="card-left pt-1 float-left">
                        <h3 className="mb-0 fw-r">
                            <span className="currency float-left mr-1">Rs. </span>
                            <span className="count">{TotalRevenue}</span>
                        </h3>
                        <p className="text-light mt-1 m-0">Total Revenue</p>
                    </div>
                    <div className="card-right float-right text-right ">
                        <i className="bi bi-graph-up fa-3x"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-6 col-lg-4 ">
            <div className="card text-white bg-flat-color-1 bg-success mt-2 shadow">
                <div className="card-body">
                    <div className="card-left pt-1 float-left">
                        <h3 className="mb-0 fw-r">
                            <span className="currency float-left mr-1">Rs. </span>
                            <span className="count">{CurrentPrice}</span>
                        </h3>
                        <p className="text-light mt-1 m-0">Current Price</p>
                    </div>
                    <div className="card-right float-right text-right ">
                    <i class="fa fa-inr fa-4x"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-sm-6 col-lg-4 ">
            <div className="card text-white bg-flat-color-1 bg-danger mt-2 shadow">
                <div className="card-body">
                    <div className="card-left pt-1 float-left">
                        <h3 className="mb-0 fw-r">
                            <span className="currency float-left mr-1">Device Count: </span>
                            <span className="count">{FaultedDeviceCount}</span>
                        </h3>
                        <p className="text-light mt-1 m-0">Faulted Device</p>
                    </div>
                    <div className="card-right float-right text-right ">
                        <i class="fa-solid fa-circle-exclamation fa-4x"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Widgets;
