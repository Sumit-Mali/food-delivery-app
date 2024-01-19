const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// model wrapper for schema to maintain connection between user and mongodb
module.exports = mongoose.model(`user`, UserSchema);
