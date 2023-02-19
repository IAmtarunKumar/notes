const express  = require('express')
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {noteRouter} = require("./routes/note.route")
const {auth} = require("./config/middleware/auth.middleware")
const cors = require('cors')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/users",userRouter)

//middleware auth
app.use(auth)
app.use("/notes",noteRouter)

app.get("/data",(req,res)=>{
    const token = req.headers.authorization
    console.log(token)


    jwt.verify(token, 'masai', function(err, decoded) {
     if(err){
        res.send({"msg" : "something went wrong in data"})
     }else{
        res.send("something went wrong")
     }
      });

    res.send("data")
})

app.listen(2000,async()=>{
try {
    await connection
    console.log("db is connected")
} catch (error) {
    console.log(error)
}
   
    console.log("2000 server is working")
})