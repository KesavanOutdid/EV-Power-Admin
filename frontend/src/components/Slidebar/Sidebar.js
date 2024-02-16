import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    return (
            <nav className="sidebar sidebar-offcanvas mt-5 bg-white " id="sidebar">
                <ul className="nav ">
                    <li className={`nav-item ${location.pathname === '/Dashboard' ? 'active' : ''}`}>
                        <Link to="/Dashboard" className="nav-link" data-toggle="collapse" href="#DashboardDrop" aria-expanded="false" aria-controls="DashboardDrop">
                            <i className="icon-grid menu-icon"/>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/ManageUser' ? 'active' : ''}`}>
                        <Link to="/ManageUser" className="nav-link">
                            <i className="bi bi-person-fill me-2" />
                            <span className="menu-title">Manage Users</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/UserRole' ? 'active' : ''}`}>
                        <Link to="/UserRole" className="nav-link">
                            <i className="bi bi-people-fill me-2" />
                            <span className="menu-title"> Manage User Roles</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/ChargerList' ? 'active' : ''}`}>
                        <Link to="/ChargerList" className="nav-link">
                        <i className="bi bi-lightning-fill me-2" /> 
                            <span className="menu-title">Manage Chargers</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/ManageSessionHistory' ? 'active' : ''}`}>
                        <Link to="/ManageSessionHistory" className="nav-link">
                        <i className="bi bi-clock-fill me-2"></i>
                        <span className="menu-title">Session history</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/ManagePrice' ? 'active' : ''}`}>
                        <Link to="/ManagePrice" className="nav-link">
                            <i className="bi bi-cash me-2" /> 
                            <span className="menu-title">Manage Price</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/TotalRevenue' ? 'active' : ''}`}>
                        <Link to="/TotalRevenue" className="nav-link">
                            <i className="bi bi-graph-up me-2" /> 
                            <span className="menu-title">Total Revenue</span>
                        </Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/AdminProfile' ? 'active' : ''}`}>
                        <Link to="/AdminProfile" className="nav-link">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="menu-title">Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
    );
}

export default Sidebar;
