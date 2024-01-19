import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
	const [credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: '',
		geolocation: '',
	});

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:5000/api/createuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
				location: credentials.geolocation,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (!json.success) {
			alert('Enter valid data');
		}
		if (json.success) {
			navigate('/');
		}
	};

	const onChange = (event) => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<>
			<div className="container">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="mb-3">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={credentials.name}
								onChange={onChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="email">Email Address</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
								name="email"
								value={credentials.email}
								onChange={onChange}
							/>
							<small
								id="emailHelp"
								className="form-text text-muted">
								We'll never share your email with anyone else.
							</small>
						</div>
					</div>
					<div className="mb-3">
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								name="password"
								value={credentials.password}
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="mb-3">
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">
								Address
							</label>
							<input
								type="text"
								className="form-control"
								name="geolocation"
								value={credentials.geolocation}
								onChange={onChange}
							/>
						</div>
					</div>
					<button type="submit" className="m-3 btn btn-success">
						Sign Up
					</button>
					<Link to="/login" className="m-3 btn btn-danger">
						Already a user?
					</Link>
				</form>
			</div>
		</>
	);
};

export default Signup;
