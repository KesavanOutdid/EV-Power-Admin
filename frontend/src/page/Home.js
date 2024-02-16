import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import EV2 from '../assets/images/EV_Logo2.png';

const Home = () => {
	return (
		<div className='container text-center mt-5 mx-auto'>
		<h1 className='mb-4'>
				<img src={EV2} alt="Logo" className="img-fluid d-inline-block w-03 h-auto" />
			</h1>			
			<div className='d-flex justify-content-center'>
			<Link to="/login" className='btn btn-primary btn-lg mr-3'>
				Login
			</Link>
			<Link to="/register" className='btn btn-success btn-lg'>
				SignUp
			</Link>
			</div>
		</div>
		);
}

export default Home;