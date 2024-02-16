/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import Avatar from '../../assets/images/faces/contact1.jpg';
import EV from '../../assets/images/EV_logo.png';
import EV2 from '../../assets/images/EV_Logo2.png';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const NavComponent = ({ userInfo, handleLogout }) => {
    useEffect(() => {
        const handleToggleSidebar = () => {
            const body = $('body');
            if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
                body.toggleClass('sidebar-hidden');
            } else {
                body.toggleClass('sidebar-icon-only');
            }
        };

        $('[data-toggle="minimize"]').on("click", handleToggleSidebar);

        return () => {
            $('[data-toggle="minimize"]').off("click", handleToggleSidebar);
        };
    }, []); // Empty dependency array ensures effect runs only once on mount

    useEffect(() => {
        $('[data-toggle="offcanvas"]').on("click", function() {
            $('.sidebar-offcanvas').toggleClass('active');
        });

        return () => {
            $('[data-toggle="offcanvas"]').off("click");
        };
    }, []); // Empty dependency array ensures effect runs only once on mount

    
    const handleLogoutClick = () => {
        handleLogout();
    };
    return (
        <div className="fixed-top">
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo m-5 " href=""><img src={EV2} className="mr-2" alt="logo"/></a>
                    <a className="navbar-brand brand-logo-mini ml-4" href=""><img src={EV} alt="logo"/></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end ">
                <button  className="navbar-toggler align-self-center mr-4" type="button"  data-toggle="minimize">
                        <span className="icon-menu"></span>
                    </button>
                    <ul className="navbar-nav navbar-nav-right">
                        {/* Profile dropdown code */}
                        <li className="nav-item nav-profile dropdown">
                            <button className="nav-link dropdown-toggle" href="#DropAvatar" data-toggle="dropdown" id="profileDropdown">
                                <img src={Avatar} alt="profile" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" id='DropAvatar' aria-labelledby="profileDropdown">
                                <Link to="/AdminProfile" className="dropdown-item">
                                    <i className="bi bi-person me-2" />
                                    profile
                                </Link>
                                <a  className="dropdown-item" onClick={handleLogoutClick}>
                                    <i className="ti-power-off text-danger"></i>
                                    <span className='text-danger'>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </div>
                {/* End of right sidebar */}
            </nav>
        </div>
    );
}

export default NavComponent;
