const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
    
const Genre = mongoose.model('Genre', genreSchema = new mongoose.Schema({ name: { type: String} }));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}); 

router.post('/', async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.body.id);

    if (!genre) return res.status(404).send('Нет такого ресурса :(');
    
    res.send(genre);
}); 

router.put('/:id', async (req, res) => {
    let genre = await Genre.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name}, 
        { new: true, useFindAndModify: false });
    if (!genre) return res.status(404).send('Нет такого ресурса :(');
    
    res.send('Successfully updated', genre);
});

router.delete('/:id', async (req, res) => {
    let genre = await Genre.findByIdAndRemove( req.params.id );
    if (!genre) return res.status(404).send('Нет такого ресурса :('); 

    res.send('Genre removed...');
});

module.exports = router;