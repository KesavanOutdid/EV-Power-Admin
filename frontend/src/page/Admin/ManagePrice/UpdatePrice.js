import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Slidebar/Sidebar";
import NavComponent from "../../../components/Navbar/Nav";
import Swal from 'sweetalert2';

const UpdatePrice = ({ userInfo, handleLogout, children }) => {
    const [UpdatePricing, setUpdatePricing] = useState({
        UnitPrice:'',
        _id: "",
    });
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // Extract user data from location state
        const { user } = location.state;
        if (user) {
        setUpdatePricing(user);
        }
    }, [location]);

    // Validation function to check if all required fields are filled and meet additional criteria
    const validateForm = () => {
        const price = UpdatePricing.UnitPrice;

        if (!price) {
            document.getElementById("validationMessage").innerText = "Please fill out all required fields.";
            return false;
        }
        if (!/^[1-9]\d*$/.test(price)) {
            document.getElementById("validationMessage").innerText = "Role ID must contain only numbers and be greater than 0.";
            return false;
        }
        document.getElementById("validationMessage").innerText = "";
        return true;
    };

    const handleEditRole = async () => {
        try {
        // Validate the form
        if (validateForm()) {
            console.log("updating Price:", UpdatePricing);
            await axios.put(
            `/ManagePrice/UpdatePrice/${UpdatePricing._id}`,
            UpdatePricing
            );
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Price updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            history.goBack();
        }
        } catch (error) {
        console.error("Error Updating price:", error);
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
                    <h3 className="card-title mt-5 ">
                        <b>Update Price</b>
                    </h3>
                    <button
                        className="btn btn-info text-white mt-4 shadow"
                        onClick={() => history.goBack()}
                    >
                        Go Back
                    </button>
                    </div>
                    <section className="CreateUser">
                    <form className="contact-form row">
                        <div className="form-field col-lg-6">
                            <label className="form-label" htmlFor="RoleID">
                                Price
                            </label>
                            <input
                                type="text"
                                id="RoleID"
                                className="input-text js-input"
                                value={UpdatePricing.UnitPrice}
                                onChange={(e) =>
                                    setUpdatePricing({
                                        ...UpdatePricing,
                                        UnitPrice: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="form-field col-lg-6 d-flex flex-column align-items-start mt-5">
                            <div id="validationMessage" className="text-danger mb-2"></div>
                            <button
                                type="button"
                                className="btn btn-primary shadow"
                                onClick={handleEditRole}
                            >
                                Update Price
                            </button>
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

export default UpdatePrice;
