const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const registerUser = async(req,res) => {
    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({message:"User Already Exists"});
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
            });
        }
        else{
            res.status(400).json({ message: "Invalid user data" });
        }}
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
        else{
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser, loginUser };


