const UserServices = require('../services/user.services')

exports.profile = async (req, res) => {
    res.send({ message: "Welcome admin" })
}

exports.getAllUser = async (req, res) => {
    try {
        const User = await(UserServices.getAllUser())
        res.send({ data: User })
    } catch (e) {
        throw Error("Error during getting all user.")
    }
}

exports.deleteUser = async (req, res) => {
    
}