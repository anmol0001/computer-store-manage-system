require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const apiRouter = require('./routes/router');

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL) //add your mongodb url here.
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/api', apiRouter);

//default route
app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to computer store manage system!!' })
})


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
