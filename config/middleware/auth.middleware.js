
const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
         if(decoded){
            // console.log(decoded)
            req.body.user = decoded.userID 
            
            next()
         }else{
            res.send({"msg" : "please login first"})
         }
             });
        
    }else{
        res.send({"msg" : "please login first"}) 
    }
}

module.exports={
    auth
}