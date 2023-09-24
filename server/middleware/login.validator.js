exports.loginValidator = (req, res, next)=>{
    const {username, password} = req.body;
    if(username && password){
        next();
    }else{
        return res.status(400).json({
            success: false,
            message: `All fields are required!`,
          });
    }
}