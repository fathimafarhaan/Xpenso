const express = require('express'); //import express library(express used to create server)
const mongoose = require('mongoose'); //Mongoose is a library to connect to MongoDB easily using Node.js
require('dotenv').config(); //This imports dotenv to read environment variables from your .env file(sensitive data hidden )

const app = express(); //instance of express , used to define routes
const PORT = process.env.PORT || 5000;//setting port no, check if port in envi var or 5000

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected')) //.then() runs when connection is successful.
.catch(err => console.log(err));// .catch() runs if there is an error connecting.

app.get('/', (req, res) => { //Defines a GET route at '/' (homepage).
    res.send('Backend Working');
});

app.use(express.json()); // to parse JSON bodies

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => { // Tells the server to listen on the specified port (5000).
    console.log(`Server running on port ${PORT}`);
});
