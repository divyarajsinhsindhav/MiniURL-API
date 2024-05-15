const Matric = require('../models/matric.models')

exports.createMetric = async (urlId) => {
    try {
        return Matric.create({
            matricOf: urlId
        });
    } catch (e) {
        throw Error("Error while create Matric")
    }
}

exports.updateMetric = async (urlId) => {
    try {
        const metric = await Matric.findOneAndUpdate(
            { matricOf: urlId },
            { $inc: { clickCount: 1 } }, 
            { new: true }
        );
        return metric;
    } catch (error) {
        throw new Error("Error updating metric click count: " + error.message);
    }
};