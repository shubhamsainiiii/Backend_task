const user = require('../Model/usermodel')
const bcrypt = require('bcrypt')
const moment = require('moment')

exports.createuser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        if (!(name && email && password && phone)) {
            return res.status(404).send({ message: "all input required" })
        }
        const alreadyemail = await user.findOne({ email })
        if (alreadyemail) {
            return res.status(404).send({ message: "Email already exist" })
        }
        const genotp = (length) => {
            const min = Math.pow(10, length - 1);
            const max = Math.pow(10, length) - 1;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const otpgen = genotp(4);
        const datetime = moment().format()
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);
        const data = { name, email, phone, password: hashpass, otp: otpgen, time: datetime };
        const newquiry = new user(data);
        await newquiry.save();
        return res.status(201).send(newquiry);
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
}

exports.getuser = async (req, res) => {
    const data = await user.find()
    return res.status(202).send(data);
}

exports.getoneuser = async (req, res) => {
    const { _id, name } = req.query
    const data = await user.findOne({ _id, name });
    console.log("data :", data)
    return res.status(202).send(data);
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const alreadyemail = await user.findOne({ email });
    if (!alreadyemail) {
        res.status(404).send({ message: "Please Signup" });
    }
    const pass = alreadyemail.password;
    const match = await bcrypt.compare(password, pass);
    if (!match) {
        return res.status(404).send({ message: "enter correct password" });
    }
    else {
        return res.status(202).send({ message: "login successfully" });
    }
}

exports.reset = async (req, res) => {
    const { email, oldpassword, newpassword } = req.body
    const alreadyemail = await user.findOne({ email });
    if (!alreadyemail) {
        res.status(404).send({ message: "Please Signup" });
    }

    const pass = alreadyemail.password;
    const match = await bcrypt.compare(oldpassword, pass);
    if (!match) {
        return res.status(404).send({ message: "enter correct password" });
    }
    const id = alreadyemail._id;
    await user.findByIdAndUpdate(id);
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password, salt);
    const data = { password: hashpass };
    return res.status(404).send({ message: "Successfully", data })
}

exports.forget = async (req, res) => {
    const { email, newpassword } = req.body
    // console.log("email",req.body);
    const alreadyemail = await user.findOne({ email });
    if (!alreadyemail) {
        res.status(404).send({ message: "Please Signup" });
    }
    const id = alreadyemail._id;
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(newpassword, salt);
    const data = { password: hashpass }
    const result = await user.findByIdAndUpdate(id, data, { new: true })
    return res.status(202).send({ message: "success", result })
}

exports.dob = async (req, res) => {
    const { dob } = req.body;
    const birth = moment(dob, "DD-MM-YYYY");
    const datee = moment();
    const ageyear = datee.diff(birth, "years");
    birth.add(ageyear, "year")
    const agemonth = datee.diff(birth, "month")
    birth.add(agemonth, "month")

    const ageday = datee.diff(birth, "day")
    birth.add(ageday, "day")
    const agee = ({ age: { ageyear, agemonth, ageday } })
    return res.status(202).send(agee)
}
