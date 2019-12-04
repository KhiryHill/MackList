const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const userSchema = new Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
});

// Define schema methods
userSchema.methods = {
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}
userSchema.statics = {
	checkPassword: function (inputPassword, storePassword) {
		return bcrypt.compareSync(inputPassword, storePassword)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", userSchema);

module.exports = User;
