const express = require("express");
const cors = require("cors");

 require('./models/index');

// import master Route from rotes
const masterRoutes = require('./routes/masterRoutes');

// env file config
require('dotenv').config();

// connect()
// run express
const app = express();


// middleware use
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// route use
app.use(masterRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));