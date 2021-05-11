
const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(() => console.log('Connection failed!', error));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));