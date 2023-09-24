exports.signupValidator = (req, res, next) =>{
    const {name, email, password, bio, role, username} = req.body;
    if(req.body && name && email && password && bio && role && username){
        next();
    }else{
        res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }
}