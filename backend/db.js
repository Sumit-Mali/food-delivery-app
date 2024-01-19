const mongoose = require('mongoose');

// mongoDB database URL
const mongoURI =
	'mongodb+srv://skmsFood:skms121524@cluster0.jl4uf6c.mongodb.net/skmsFood?retryWrites=true&w=majority';

// Connecting to the database
const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true });
		console.log('Connected to MongoDB');

		// Fetching the data from database
		const fetched_data = await mongoose.connection.db.collection(
			'food_items'
		);
		// find()=>used to retrieve the data from db
		fetched_data.find({}).toArray(async function (err, data) {
			const foodCategory = await mongoose.connection.db.collection(
				'food_category'
			);
			foodCategory.find({}).toArray(function (err, catData) {
				if (err) {
					console.log(err);
				} else {
					// console.log(data);
					global.food_items = data;
					// console.log(global.food_items);
					global.food_category = catData;
				}
			});
			// if (err) {
			// 	console.log(err);
			// } else {
			// 	// console.log(data);
			// 	global.food_items = data;
			// 	console.log(global.food_items);
			// }
		});
	} catch (err) {
		console.error('Error connecting to MongoDB:', err.message);
	}
};

module.exports = connectDB;
