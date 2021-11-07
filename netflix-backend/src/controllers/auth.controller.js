const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user)=>{
    return jwt.sign({ user: user }, "deependra");
}

const register = async (req, res) => {
    let user;
    try {
        user = await User.findOne({ email: req.body.email }).lean().exec();

        if(user) return res.status(400).send({status:"failed",message:"Please try with a different email and password"})

        user = await User.create(req.body);

        if (!user) return res.status(500).send({ status: "failed", message: "Please try again later" });

        const token = newToken(user);

        res.status(201).json({ user, token });
    }
    catch(err) {
        console.log(err);
        return res.status(500).send({status: "failed", message:"Please try again later"})
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(400).send({ status: "failed", message: "email or password didn't matched, Please try with a different email and password" });

        const match = await user.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ status: "failed", message: "email or password didn't matched, Please try with a different email and password" });

        const token = newToken(user);
        return res.status(201).json({ token: token,user:user });
    }
    catch {
        return res.status(500).send({ status: "failed", message: "Server error, Please try again later" });
    }
}

module.exports = {
    register,
    login
};