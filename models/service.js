const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    },

    { timestamps: true, collection: 'services' }
)

module.exports = mongoose.model('services', ServiceSchema)