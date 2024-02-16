import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Wallet = ({ userInfo }) => {
    const [amount, setAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`http://192.168.1.12:5000/GetWalletBalance?username=${userInfo.username}`);
            const data = await response.json();
            setWalletBalance(data.balance);
            } catch (error) {
            console.error('Error fetching wallet balance:', error);
            }   
        };

        fetchData(); 
        }, [userInfo.username]);
        
    const history = useHistory();

    const handleTransaction = async () => {
        const amountInPaise = parseFloat(amount) ;

    try {
        const { data: { key } } = await axios.get('http://192.168.1.12:5000/api/getkey');
        const { data: { order } } = await axios.post('http://192.168.1.12:5000/dashboard', { amount: amountInPaise ,username: userInfo.username,  });

        const waitForRazorpay = () => {
        if (window.Razorpay) {
            const options = {
            key,
            amount: order.amount,
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Razorpay',
            image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
            order_id: order.id,
            callback_url: 'http://192.168.1.12:5000/paymentverification',
            prefill: {
                name: userInfo.username,
                email: userInfo.email, // Replace with user's email from userInfo
                contact: userInfo.phone, // Replace with user's phone number from userInfo
            },
            notes: {
                address: 'Your Company Address',
            },
            theme: {
                color: '#3399cc',
            },
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } else {
            setTimeout(waitForRazorpay, 100);
        }
        };

        waitForRazorpay();
    } catch (error) {
        console.error('Error in handleTransaction:', error);
    }
    };

    useEffect(() => {
    // Fetch and load Razorpay script asynchronously
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
        // Cleanup: remove the script when the component unmounts
        document.head.removeChild(script);
    };
    }, []);

    return (
        <div className="container mt-5">
            <main className="p-3 p-md-5 bg-light rounded position-relative">
            <button
                className="btn btn-secondary position-absolute top-0 end-0 m-3"
                onClick={() => history.goBack()}
            >
                Go Back
            </button>
            <br />
            <h2 className="mb-4">
                Welcome, <span className="text-primary">{userInfo.username}</span>
            </h2>
            <div>
                {walletBalance !== null ? (
                <p>Available balance: Rs. {walletBalance}</p>
                ) : (
                <p>Loading wallet balance...</p>
                )}
            </div>
            {/* Transaction form */}
            <form>
                <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                    Amount
                </label>
                <div className="input-group">
                    <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    />
                </div>
                </div>
                <div className="mb-3">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleTransaction}
                >
                    Add Amount
                </button>
                </div>
            </form>
            </main>
        </div>
        );

    };

export default Wallet;
