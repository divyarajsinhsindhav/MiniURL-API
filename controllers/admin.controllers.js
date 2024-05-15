const UserServices = require('../services/user.services')
const URLServices = require('../services/url.services')

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

exports.getAllUrlDetails = async (req, res) => {
    try {
        const data = await(URLServices.getAllURLWithMetric())
        if (!data) res.send("Not any data available")
        return res.send({ data: data });
    } catch (e) {
        throw Error("Error while get all url details")
    }
}