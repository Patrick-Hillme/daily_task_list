// Import required libraries and modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// Define a schema for the User data structure
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [3, 'First name must be at least 3 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [3, 'last name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters']
    }
}, {timestamps: true});

// Define a virtual field 'confirmPassword' for password confirmation
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value);

// Middleware to validate that the 'password' and 'confirmPassword' fields match
UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next();
});

// Middleware to hash the password before saving it to the database
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

// Create a mongoose model named 'User' based on the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);