const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 6000;

const mongoURL = 'mongodb+srv://shubham:1234@cluster0.2ceki.mongodb.net/Testingdata';
mongoose.connect(mongoURL);

app.use(express.json());
const userRoute = require('./Router/userroute')
app.use('/user', userRoute);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});







// server create employee model bnana min. 20 column data post or get
// req.quiry or req.param


//app.get('/getemployees', async (req, res) => {
//     const data = await employee.find({}, { id: 1, _id: 1 });
//     return res.status(202).send(data)
// })
