const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlumberSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        tel_number: {
            type: String,
            required: true,
        },
        customer_rating: {
            type: String,
            required: true,
        }
    },

    { timestamps: true, collection: 'plumbers' }
)

module.exports = mongoose.model('plumbers', PlumberSchema)