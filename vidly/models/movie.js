const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
    minlength: 0,
    maxlength: 255
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    minlength: 0,
    maxlength: 255
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    genreId: Joi.string().required(),
    dailyRentalRate: Joi.number().required(),
    numberInStock: Joi.number().required(),
  }

  return Joi.validate(movie, schema)
};

exports.Movie = Movie;
exports.validate = validateMovie;