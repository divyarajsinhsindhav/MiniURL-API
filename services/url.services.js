const URL = require('../models/url.models')
const crypto = require('crypto');

const generateShortUrl = async () => {
    const NUM_CHARS_SHORT_LINK = 7;
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    while (true) {
        for (let i = 0; i < NUM_CHARS_SHORT_LINK; i++) {
            const randomByte = crypto.randomInt(0, ALPHABET.length - 1);
            result += ALPHABET.charAt(randomByte);
        }
        // make sure the short link isn't already used
        const isExist = await URL.findOne({ result });
        if (!isExist) {
            return result;
        }
    }
}

exports.createURL = async (originalURL, userId) => {
    try {
        const shortId = await generateShortUrl();
        return URL.create({
            shortId: shortId,
            redirectUrl: originalURL,
            createdBy: userId,
        });
    } catch (e) {
        throw Error("Error while creating Short URL");
    }
}

exports.findURL = async (shortId) => {
    try {
        return URL.findOne({ shortId: shortId });
    } catch (e) {
        throw Error("Error during finding URL");
    }
}

exports.findURLByUser = async (userId) => {
    try {
        return URL.find({ createdBy: userId });
    } catch (e) {
        throw Error("Error while find url by user")
    }
}

exports.getAllURLWithMetric = async () => {
    try {
        return URL.aggregate([
            {
                $lookup: {
                    from: "matrics",                 
                    localField: "_id",              
                    foreignField: "matricOf",       
                    as: "Matric",
                    pipeline: [{
                        $project: {
                            clickCount: 1
                        }
                    }]
                }
            }
        ]);
    } catch (e) {
        throw Error("Error while get all urls with metric")
    }
}

exports.updateURL = async () => {
    try {
        
    } catch (e) {
        
    }
}

exports.deleteURL = async () => {
    try {
        
    } catch (e) {
        
    }
}