const jwt = require('jsonwebtoken')

exports.authUser = async (req, res, next)=>{
    const token = req.cookies?.token || 'null';
    console.log("token-->", token)
    if(!token){
        return res.status(400).json({
            success: false,
            message: "User authentication failed!",
            token: req.cookies, 
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Payload-->",payload)
        req.user = {id: payload.id, username: payload.username}
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}