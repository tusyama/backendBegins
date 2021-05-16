const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = new mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true, 
                minlenght: 3,
                maxlenght: 50
            },
            isGold:{
                type: Boolean,
                required: true
            },
            phone: {
                type: Number,
                required: true,
                minlenght: 6,
                maxlenght: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                default: 0,
                minlength: 0,
                maxlength: 255
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    }
  
    return Joi.validate(rental, schema)
};

exports.Rental = Rental;
exports.validate = validateRental;