import React from 'react';
import '../../App.css';
import { useHistory } from 'react-router-dom';

const PaymentSuccess = () => {
    const history = useHistory();

    return (
        <div className='App'>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4 className="card-title mb-4">Payment Success!</h4>
                                <p className="card-text">Thank you for your payment.</p>
                                {/* You can add more content or details here */}
                                <button className="btn btn-secondary position-absolute top-0 end-0 m-4" onClick={() => history.goBack()}>
                                    Go Back
                                </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
