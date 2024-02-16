import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import Sidebar from '../../components/Slidebar/Sidebar';
import NavComponent from '../../components/Navbar/Nav';
const AdminDashboard = ({ userInfo, handleLogout,children }) => {

    useEffect(() => {
        let trafficChartInstance;

        const initializeTrafficChart = () => {
            const trafficChart = document.getElementById('TrafficChart');
            if (trafficChart) {
                // Destroy the previous chart instance if it exists
                if (trafficChartInstance) {
                    trafficChartInstance.destroy();
                }

                const ctx = trafficChart.getContext('2d');

                // Dummy data (replace with your actual traffic data)
                const data = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Traffic Data',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                };

                // Create a new chart instance
                trafficChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        scales: {
                            x: [{
                                gridLines: {
                                    display: false
                                }
                            }],
                            y: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    display: false
                                }
                            }]
                        }
                    }
                });
            }
        };

        initializeTrafficChart();
    }, []);

        return (
            <div className="container-fluid bg-light">
            <div className="row ">
            {/* Navbar */}
            <NavComponent userInfo={userInfo} handleLogout={handleLogout} />
            
            {/* Sidebar */}
            <Sidebar />
        
            {/* Main content */}
            <main role="main" className="col-md-9 ml-sm-auto mr-auto col-lg-10 px-md-4 bg-light  content-wrapper">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap bg-light align-items-center pt-3 pb-2 mb-3 mt-4">
                <div className="container-fluid mt-5  ">
                    <h2>Welcome <strong className='text-primary'>{userInfo.username}</strong>,</h2>
                    <p>Monitor and manage user  accounts.</p><hr className="fw-bold" />
                    {/* Widgets */}
                        <div className="row">
                            <div className="col-sm-6 col-lg-3 ">
                                <div className="card text-white bg-flat-color-1 bg-primary mt-2 shadow">
                                    <div className="card-body">
                                        <div className="card-left pt-1 float-left">
                                            <h3 className="mb-0 fw-r">
                                                <span className="currency float-left mr-1">$</span>
                                                <span className="count">23569</span>
                                            </h3>
                                            <p className="text-light mt-1 m-0">Revenue</p>
                                        </div>
                                        <div className="card-right float-right text-right ">
                                        <i className="bi bi-graph-up fa-3x"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card text-white bg-flat-color- bg-success mt-2 shadow">
                                    <div className="card-body">
                                        <div className="card-left pt-1 float-left">
                                            <h3 className="mb-0 fw-r">
                                                <span className="count float-left">85</span>
                                                <span>%</span>
                                            </h3>
                                            <p className="text-light mt-1 m-0">Dummy text here</p>
                                        </div>
                                        <div className="card-right float-right text-right">
                                        <i className="fas fa-users  fade-5  fa-4x"></i> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card text-white bg-flat-color-3 bg-warning mt-2 shadow">
                                    <div className="card-body">
                                        <div className="card-left pt-1 float-left">
                                            <h3 className="mb-0 fw-r">
                                                <span className="count">6569</span>
                                            </h3>
                                            <p className="text-light mt-1 m-0">Total clients</p>
                                        </div>
                                        <div className="card-right float-right text-right">
                                        <i className="fas fa-users  fade-5  fa-4x"></i> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card text-white bg-flat-color-2 bg-info mt-2 shadow">
                                    <div className="card-body">
                                        <div className="card-left pt-1 float-left">
                                            <h3 className="mb-0 fw-r">
                                                <span className="count">1490</span>
                                            </h3>
                                            <p className="text-light mt-1 m-0">New users</p>
                                        </div>
                                        <div className="card-right float-right text-right">
                                        <i className="fas fa-users  fade-5  fa-4x"></i> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        {/* <!--  Traffic  --> */}
                        <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="box-title">Traffic</h4>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card-body">
                                    {/* <canvas id="TrafficChart" height="150"></canvas> */}
                                    <div id="traffic-chart" className="traffic-chart"></div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                {/* ... (remaining code unchanged) */}
                            </div>
                        </div>
                        <div className="card-body"></div>
                    </div>
                </div>
            </div>
                </div>
                </div>
                {children}
            </main>
            </div>
        </div> 
        );
    };

export default AdminDashboard;
