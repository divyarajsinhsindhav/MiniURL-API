const mongoose = require('mongoose')

const matricSchema = new mongoose.Schema({
    clickCount: {
        type: Number,
        default: 0,
    },
    matricOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "URL"
    }
}, { timestamps: true })

const MatricSchema = mongoose.model('Matric', matricSchema)

module.exports = MatricSchema;