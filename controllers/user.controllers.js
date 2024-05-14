const bcrypt = require('bcrypt')

const UserServices = require('../services/user.services')
const URLServices = require('../services/url.services')
const { createAccessToken } = require('../services/authantication.services')

exports.register = async (req, res) => {
    try {
        let email = req.body.email
        let User = await UserServices.getUserByEmail(email.toLowerCase().trim())
        if (User) return res.send({ message: 'User already with that email' })
        let user = await UserServices.createUser(req.body)
        return res.send({ data: user, message: "User created successfully." })
    } catch (e) {
        throw Error("Issue With create user")
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const User = await UserServices.getUserByEmail(email.toLowerCase().trim())
        if (!User) return res.send({ message: 'User is not found' })
        const checkPassword = await (bcrypt.compare(password, User.password));
        if (!checkPassword) return res.send({ message: 'Password is wrong' })
        const token = createAccessToken(User._id, User.isAdmin);
        return res.send({ message: 'User login successfully', data: User, token: token })
    } catch (e) {
        throw Error("Error while login.")
    }
}

exports.profile = async (req, res) => {
    try {
        if (!req.userId) return res.send({ message: "You need to login" })
        const User = await UserServices.getUserById(req.userId)
        if (!User) return res.send({ message: "User not found." })
        const urls = await(URLServices.findURLByUser(req.userId))
        return res.send({ message: "Successfully geting the user.", data: User, urls: urls })
    } catch (e) {
        throw Error('Error during getting profile')
    }
}

exports.logout = async (req, res) => {
    try {
        
    } catch (e) {
        
    }
}

