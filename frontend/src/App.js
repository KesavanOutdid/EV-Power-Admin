/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect  } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route,  Redirect } from 'react-router-dom'; // Import Redirect
import Home from './page/Home';
import SignUp from './page/Auth/Register';
import Login from './page/Auth/Login';
import Dashboard from './page/Dashboard';

/* Admin SIde Route */
import AdminDashboard from './page/Admin/adminDashboard';
import AdminProfile from './page/Admin/Profile/Profile';

import ManageUser from './page/Admin/ManageUser/manage_user'
import CreateUser from './page/Admin/ManageUser/CreateUser'
import UpdateUser from './page/Admin/ManageUser/UpdateUser'
import ViewSession from './page/Admin/ManageUser/Session/ViewSession'
import ViewWalletTransaction from './page/Admin/ManageUser/Transaction/ViewWalletTransaction'
import ChargerList from './page/Admin/ManageCharger/charger_list'
import CreateCharger from './page/Admin/ManageCharger/CreateCharger'
import UpdateCharger from './page/Admin/ManageCharger/UpdateCharger'

import UserRole from './page/Admin/ManageUserRoles/user_role'
import CreateUserRoles from './page/Admin/ManageUserRoles/CreateUserRoles'
import UpdateUserRoles from './page/Admin/ManageUserRoles/UpdateUserRoles'

import ManageSessionHistory from  './page/Admin/SessionHistory/ManageSessionHistory'
import ViewSessionHistory  from './page/Admin/SessionHistory/ViewSessionHistory'

import TotalRevenue from './page/Admin/TotalRevenue/TotalRevenue'

import ManagePrice from './page/Admin/ManagePrice/ManagePrice'
import UpdatePrice from './page/Admin/ManagePrice/UpdatePrice'


/* User side route */
import Wallet from './page/User/Wallet/Wallet';
import PaymentSuccess from './page/User/Wallet/PaymentSuccess';
import ChargingSession from "./page/User/Charging/ChargingSession";
import UserDashboard from "./page/User/UserDashboard ";

import jQuery from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';

const App = () => {
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!storedUser);
  const [userInfo, setUserInfo] = useState(storedUser || {});
  const [initialLoad, setInitialLoad] = useState(false); // Define initialLoad state

  const handleLogin = (data) => {
    const {username, phone,email, ...rest } = data;
    setUserInfo({ username,phone,email, ...rest });
    setLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify({ username,phone,email, ...rest }));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserInfo({});
    sessionStorage.removeItem('user');
  };

  useEffect(() => {
    // jQuery initialization code
    (function($) {
      'use strict';
      $(function() {
        var body = $('body');
        var contentWrapper = $('.content-wrapper');
        var scroller = $('.container-scroller');
        var footer = $('.footer');
        var sidebar = $('.sidebar');
    
        //Add active class to nav-link based on url dynamically
        //Active class can be hard coded directly in html file also as required
    
        function addActiveClass(element) {
          if (current === "") {
            //for root url
            if (element.attr('href').indexOf("index.html") !== -1) {
              element.parents('.nav-item').last().addClass('active');
              if (element.parents('.sub-menu').length) {
                element.closest('.collapse').addClass('show');
                element.addClass('active');
              }
            }
          } else {
            //for other url
            if (element.attr('href').indexOf(current) !== -1) {
              element.parents('.nav-item').last().addClass('active');
              if (element.parents('.sub-menu').length) {
                element.closest('.collapse').addClass('show');
                element.addClass('active');
              }
              if (element.parents('.submenu-item').length) {
                element.addClass('active');
              }
            }
          }
        }
    
        var current = window.location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
        $('.nav li a', sidebar).each(function() {
          var $this = $(this);
          addActiveClass($this);
        })
    
        $('.horizontal-menu .nav li a').each(function() {
          var $this = $(this);
          addActiveClass($this);
        })
    
        //Close other submenu in sidebar on opening any
    
        sidebar.on('show.bs.collapse', '.collapse', function() {
          sidebar.find('.collapse.show').collapse('hide');
        });
    
    
        //Change sidebar and content-wrapper height
        applyStyles();
    
        function applyStyles() {
          //Applying perfect scrollbar
          if (!body.hasClass("rtl")) {
            if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
              const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
            }
            if ($('.chats').length) {
              const chatsScroll = new PerfectScrollbar('.chats');
            }
            if (body.hasClass("sidebar-fixed")) {
              if($('#sidebar').length) {
                var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
              }
            }
          }
        }
    
        $('[data-toggle="minimize"]').on("click", function() {
          if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
            body.toggleClass('sidebar-hidden');
          } else {
            body.toggleClass('sidebar-icon-only');
          }
        });
    
        //checkbox and radios
        $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
    
        //Horizontal menu in mobile
        $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
          $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
        });
        // Horizontal menu navigation in mobile menu on click
        var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
        navItemClicked.on("click", function(event) {
          if(window.matchMedia('(max-width: 991px)').matches) {
            if(!($(this).hasClass('show-submenu'))) {
              navItemClicked.removeClass('show-submenu');
            }
            $(this).toggleClass('show-submenu');
          }        
        })
    
        $(window).scroll(function() {
          if(window.matchMedia('(min-width: 992px)').matches) {
            var header = $('.horizontal-menu');
            if ($(window).scrollTop() >= 70) {
              $(header).addClass('fixed-on-scroll');
            } else {
              $(header).removeClass('fixed-on-scroll');
            }
          }
        });
      });
    
      // focus input when clicking on search icon
      $('#navbar-search-icon').click(function() {
        $("#navbar-search-input").focus();
      });
      
      // Your jQuery initialization code here
    })(jQuery);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={SignUp} />
        <Route   path="/login">
          {loggedIn ? <Redirect to="/Dashboard" /> : <Login handleLogin={handleLogin} />}
        </Route>
        <Route path="/Dashboard">
        {loggedIn ? (
          initialLoad ? (
            <Dashboard userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <Dashboard userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>


        {/* Admin SIde Route */}
      {/* Admin Side Route */}
      <Route path="/AdminDashboard">
        {loggedIn ? (
          initialLoad ? (
            <AdminDashboard userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <AdminDashboard userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/AdminProfile">
      {loggedIn ? (
          initialLoad ? (
            <AdminProfile userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <AdminProfile userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/ManageUser">
        {loggedIn ? (
          initialLoad ? (
            <ManageUser userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ManageUser userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/CreateUser" >
        {loggedIn ? (
          initialLoad ? (
            <CreateUser userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <CreateUser userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/UpdateUser">
        {loggedIn ? (
          initialLoad ? (
            <UpdateUser userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UpdateUser userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/ViewSession">
        {loggedIn ? (
          initialLoad ? (
            <ViewSession userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ViewSession userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/ViewWalletTransaction">
        {loggedIn ? (
          initialLoad ? (
            <ViewWalletTransaction userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ViewWalletTransaction userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/UserRole" >
        {loggedIn ? (
          initialLoad ? (
            <UserRole userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UserRole userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/CreateUserRoles" >
        {loggedIn ? (
          initialLoad ? (
            <CreateUserRoles userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <CreateUserRoles userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/UpdateUserRoles"  >
        {loggedIn ? (
          initialLoad ? (
            <UpdateUserRoles userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UpdateUserRoles userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/ChargerList" >
        {loggedIn ? (
          initialLoad ? (
            <ChargerList userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ChargerList userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/CreateCharger" >
        {loggedIn ? (
          initialLoad ? (
            <CreateCharger userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <CreateCharger userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/UpdateCharger" >
        {loggedIn ? (
          initialLoad ? (
            <UpdateCharger userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UpdateCharger userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/ManageSessionHistory" >
        {loggedIn ? (
          initialLoad ? (
            <ManageSessionHistory userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ManageSessionHistory userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/ViewSessionHistory" >
        {loggedIn ? (
          initialLoad ? (
            <ViewSessionHistory userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ViewSessionHistory userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/TotalRevenue" >
        {loggedIn ? (
          initialLoad ? (
            <TotalRevenue userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <TotalRevenue userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/ManagePrice" >
        {loggedIn ? (
          initialLoad ? (
            <ManagePrice userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ManagePrice userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/UpdatePrice" >
        {loggedIn ? (
          initialLoad ? (
            <UpdatePrice userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UpdatePrice userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        
        <Route path="/UserDashboard"  >
        {loggedIn ? (
          initialLoad ? (
            <UserDashboard userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <UserDashboard userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

        {/* User side route */}
        <Route path="/wallet">
        {loggedIn ? (
          initialLoad ? (
            <Wallet userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <Wallet userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/PaymentSuccess"  >
        {loggedIn ? (
          initialLoad ? (
            <PaymentSuccess userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <PaymentSuccess userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
        <Route path="/ChargingSession" >
        {loggedIn ? (
          initialLoad ? (
            <ChargingSession userInfo={userInfo} handleLogout={handleLogout} setInitialLoad={setInitialLoad} />
          ) : (
            <ChargingSession userInfo={userInfo} handleLogout={handleLogout} />
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    </Router>
  );
};

export default App;
