const express = require("express");
require("dotenv").config();
const path = require('path');

const db = require('./config/db.js');

const app = express();

app.use(express.json());

app.use('/api', require('./routes/index.js'));

app.get('/', async (req,res) => {
  return res.status(400).json({"server is running"});
}

app.listen(process.env.PORT, (e) => {
  e ? console.log(e) : console.log(`Server is running on port :- ${process.env.PORT}`);
});
