import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
	const [search, setSearch] = useState('');
	const [foodCat, setFoodCat] = useState([]);
	const [foodItem, setFoodItem] = useState([]);

	const loadData = async () => {
		let response = await fetch('http://localhost:5000/api/foodData', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		response = await response.json();
		// console.log(response[0], response[1]);
		setFoodItem(response[0]);
		setFoodCat(response[1]);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			{/* Navbar */}
			<div>
				<Navbar />
			</div>
			{/* Carousel */}
			<div>
				<div
					id="carouselExampleFade"
					className="carousel slide carousel-fade"
					style={{ objectFit: 'contain !important' }}>
					<div className="carousel-inner" id="carousel">
						<div
							className="carousel-caption"
							style={{ zIndex: '10' }}>
							<div class="d-flex justify-content-center">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
									}}
								/>
								{/* <button
									className="btn btn-outline-success text-white bg-success"
									type="submit">
									Search
								</button> */}
							</div>
						</div>
						<div className="carousel-item active">
							<img
								src="https://source.unsplash.com/random/900x700/?burger"
								className="d-block w-100"
								alt="..."
								style={{ filter: 'brightness(30%' }}
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/900x700/?pizza"
								className="d-block w-100"
								alt="..."
								style={{ filter: 'brightness(30%' }}
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://source.unsplash.com/random/900x700/?biryani"
								className="d-block w-100"
								alt="..."
								style={{ filter: 'brightness(30%' }}
							/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="prev">
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="next">
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			{/* FoodCategory and FoodItems */}
			<div className="container">
				{foodCat != []
					? foodCat.map((data) => {
							return (
								<div className="row me-3">
									<div key={data._id} className="fs-3 m-3">
										{data.CategoryName}
									</div>
									<hr />
									{foodItem != [] ? (
										foodItem
											.filter(
												(item) =>
													item.CategoryName ===
														data.CategoryName &&
													item.name
														.toLowerCase()
														.includes(search)
											)
											.map((filterItems) => {
												return (
													<div
														key={filterItems._id}
														className="col-12col-md-6 col-lg-3">
														<Card
															foodItem={
																filterItems
															}
															options={
																filterItems
																	.options[0]
															}
														/>
													</div>
												);
											})
									) : (
										<div>No Such Data Found</div>
									)}
								</div>
							);
					  })
					: ''}
			</div>
			{/* Footer */}
			<div>
				<Footer />
			</div>
		</>
	);
};

export default Home;
