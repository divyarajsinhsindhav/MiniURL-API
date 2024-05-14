const URLServices = require('../services/url.services')

exports.genrateURL = async (req, res) => {
    try {
        const originalURL = req.body.redirectUrl
        const createdBy = req.userId
        const data = await(URLServices.createURL(originalURL, createdBy));
        return res.send({ message: "Successfully url is genrated.", data: data })
    } catch (e) {
        throw Error("Error while genrating URL.")
    }
}

exports.clickOnUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId
        const url = await(URLServices.findURL(shortId));
        if (!url) return res.send({ message: "Something went wrong" })
        res.redirect(url.redirectUrl);
    } catch (e) {
        throw Error("Error while redirecting.")
    }
}