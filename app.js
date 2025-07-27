const express = require("express");
require("dotenv").config();
const path = require('path');

const db = require('./config/db.js');

const app = express();

app.use(express.json());

app.use('/api', require('./routes/index.js'));

app.get('/', async (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

module.exports = app;
