const user = require('../Model/usermodel')
const bcrypt = require('bcrypt')

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
        const genotp=()=>{
            
        }
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);
        const data = { name, email, phone, password: hashpass };
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

