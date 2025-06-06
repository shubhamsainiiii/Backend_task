const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 6000;

const mongoURL = 'add your mongodb atlas link'
mongoose.connect(mongoURL);

app.use(express.json());
const userRoute = require('./Router/userroute')
app.use('/user', userRoute);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});