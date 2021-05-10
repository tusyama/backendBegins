const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Connection failed!', error));

const genreSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre(id, name) {
    const genre = new Genre({
        id: id,
        name: name
    });

    try{
        const result = await genre.save();
        console.log('Genre created:\n', result); 
    }
    catch(ex) {
        for (field in ex)
            console.log(ex[field].message)
    };
};

async function getGenres() {
    const genres = await Genre
        .find()
        .sort({ name: 1 });
    return genres;
};

async function changeGenre(obj, newName) {
    const genre = obj;
    if (!genre) return;

    genre.name = newName;
    
    try {
        const result = await genre.save();
        console.log('Succesfully changed:\n', result);
    }
    catch (ex) {
        console.log(ex.message)
    };
};  

async function removeGenre(genre) {    
    try {
        const result = await genre.remove();
        console.log('Succesfully removed...');
    }
    catch (ex) {
        console.log(ex.message)
    };
};  

module.exports = {getGenres, createGenre, changeGenre, removeGenre}; 