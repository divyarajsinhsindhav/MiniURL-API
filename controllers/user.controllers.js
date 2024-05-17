require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserServices = require('../services/user.services')
const URLServices = require('../services/url.services')
const MailServices = require('../services/mail.services')
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

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        const body = req.body;
        const updatedData = await UserServices.updateUser(userId, body);
        return res.send({ message: "Your profile update successfully.", data: updatedData })
    } catch (e) {
        throw Error("Error while update profile.")
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        const data = UserServices.deleteUser(req.userId);
        return res.send({ message: "Your profile successfully deleted", data: data })
    } catch (e) {
        throw Error("Error while delete the user.")
    }
}

exports.deleteUrl = async (req, res) => {
    try {
        const urlId = req.body.urlid
        const data = await URLServices.deleteURL(urlId);
        return res.send({ message: "Delete the URL successfully", data: data })
    } catch (e) {
        throw Error("Error while delete the URL by Admin")
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const user = await(UserServices.getUserByEmail(email))
        if (!user) return res.send({ message: "User not found" });
        // console.log("Hell0")
        const token = jwt.sign({ email }, process.env.RESET_PASSWORD_TOKEN, { expiresIn: '1h' })
        MailServices.forgetPassword(email, token, res);
        return res.send({ message: "Check your mail box and reset password" });
    } catch (e) {
        throw Error("Error while handle forget password")
    }
}

exports.passwordReset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN)
        const email  = decoded.email
        const user = await UserServices.getUserByEmail(email)
        if(!user) return res.send("Please try again")
        const hashPassword = await bcrypt.hash(newPassword, 10)
        await UserServices.updateUser(user._id, { password: hashPassword })
        return res.send({ message: "Password successfully updated" })
    } catch (e) {
        throw Error("Error while reset the password")
    }
}

exports.logout = async (req, res) => {
    try {
        
    } catch (e) {
        
    }
}

