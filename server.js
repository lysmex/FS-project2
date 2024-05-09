// "PÄÄ" FILE

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Router = require('./routes/router');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Yhdistetään MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use('/', Router);

// Käynnistä serveri
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});