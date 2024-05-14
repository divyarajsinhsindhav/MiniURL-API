const User = require('../models/user.models')
const bcrypt = require('bcrypt')

exports.createUser = async (user) => {
    try {
        let hashPassword = await(bcrypt.hash(user.password, 10));
        const newUser = await User.create({
            username: user.username,
            email: user.email,
            password: hashPassword
        })
        return newUser;
    } catch (e) {
        throw Error("Error while creating user.")
    }
}

exports.getUserByEmail = async (email) => {
    try {
        let user = User.findOne({ email: email.toLowerCase().trim() })
        return user
    } catch (e) {
        throw Error("Error during getting user by email.")
    }
}

exports.getUserById = async (userId) => {
    try {
        return User.findById(userId)
    } catch (e) {
        throw Error("Error during getting user by Id")
    }
}

exports.getAllUser = async () => {
    try {
        return User.find()
    } catch (e) {
        throw Error("Error during get all user.")
    }
}

exports.updateUser = async () => {
    try {
        
    } catch (e) {
        
    }
}

exports.deleteUser = async () => {
    try {
        
    } catch (e) {
        
    }
}
