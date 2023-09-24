const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
    },
    role:{
        type: String,
        enum: ["Student", "Admin", "Visitor"]
    }

})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;