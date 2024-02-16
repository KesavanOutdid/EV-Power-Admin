import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChargingSession = () => {
    const [chargingStatus, setChargingStatus] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    const handleStartCharging = () => {
        // Add logic to handle starting the charging session
        setChargingStatus(true);
    };

    const handleStopCharging = () => {
        // Add logic to handle stopping the charging session
        setChargingStatus(false);
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const handleSearchCharger = () => {
        // Add logic to handle searching for chargers based on searchQuery
        console.log('Searching for charger:', searchQuery);
    };

    return (
        <div className="container mt-5">
            <main className="p-3 p-md-5 bg-light rounded position-relative">
                <button className="btn btn-secondary position-absolute top-0 end-0 m-3" onClick={handleGoBack}>
                    Go Back
                </button><br /><br/>
                <h2 className="mb-4">Charging Session</h2>
                <div className="mb-3">
                    <label htmlFor="searchQuery" className="form-label">Search Charger:</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            id="searchQuery"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter charger_ID"
                        />
                    </div>
                </div>
                <div className="mb-3 text-center">
                    {/* Show only on medium and larger screens (not mobile) */}
                    <button className="btn btn-primary d-none d-md-inline" onClick={handleSearchCharger}>
                        Search
                    </button>
                </div>
                <div className="mb-3 text-center">
                    {/* Show only on small screens (mobile) */}
                    <button className="btn btn-primary d-md-none" onClick={handleSearchCharger}>
                        Search
                    </button>
                </div>
                <div className="mb-3 text-md-     ">
                    {/* Hide on small screens (mobile) */}
                    <p>Charging Status: {chargingStatus ? 'Charging' : 'Not Charging'}</p>
                    {chargingStatus ? (
                        <button className="btn btn-danger" onClick={handleStopCharging}>
                            Stop Charging
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={handleStartCharging}>
                            Start Charging
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ChargingSession;
