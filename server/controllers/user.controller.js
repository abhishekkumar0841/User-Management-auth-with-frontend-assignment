const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.userSignup = async (req, res) => {
  try {
    const { name, username, email, password, bio, role } = req.body;

    // checking if user already exists
    const isUser = await UserModel.findOne({ username, email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    //hashing password
    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      bio,
      role,
    });

    const saveUser = await newUser.save();

    res.status(200).json({
      success: true,
      data: saveUser,
      message: "User signup successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `User unable to signup ${error.message}`,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validUser = await UserModel.findOne({username})

    if(!validUser){
        return res.status(400).json({
            success: false,
            message: "Signup first!",
          });
    }

    const validPassword = await bcrypt.compare(password, validUser.password)

    if(!validPassword){
        return res.status(400).json({
            success: false,
            message: "Wrong Password!",
          });
    }

    const payload = {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        role: validUser.role,
    }

    if(validUser && validPassword){
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

        validUser.password = undefined;
        // console.log(validUser)

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true, //not able to modify cookie on client side
        }

        res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            data: validUser,
            message: "User Logged in successfully"
        })
    }
    
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `User unable to login ${error.message}`,
    });
  }
};

exports.getUser = async (req, res) => {
try {
    const {id, username} = req.user;
    const userData = await UserModel.findOne({username})
    res.status(200).json({
        success: true,
        data: userData,
        message: `User get successfully.. Hello ${userData.name}`
    })
} catch (error) {
    return res.status(400).json({
        success: false,
        message: `Unable to get user ${error.message}`,
      });
}

};
