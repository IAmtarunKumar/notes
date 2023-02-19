const express = require("express")
const {NoteModel} = require("../model/note.model")
const noteRouter = express.Router()


noteRouter.get("/",async(req,res)=>{

    const data = await NoteModel.find()
    res.send(data)
})


noteRouter.post("/",async(req,res)=>{
    const payload = req.body
    try {
        const note  =new NoteModel(payload)
        await note.save()
        res.send({"msg" : "note is created"})  
    } catch (error) {
        console.log(error)
        res.send({"msg" : "something went wrong"})
    }
   
})


noteRouter.patch("/:id",async(req,res)=>{
    const payload = req.body
    const ID = req.params.id
    try {
        const data = await NoteModel.findByIdAndUpdate({_id:ID},payload)
    res.send({"msg" : "notes is update"}) 
    } catch (error) {
        console.log(error)
        res.send({"msg" : "Something went wrong","error":error.message})
    }
   
})


noteRouter.delete("/:id",async(req,res)=>{
  
    const ID = req.params.id
   
    // console.log(ID)
    try {
        let userdata = await NoteModel.find({_id : ID})
        console.log(userdata)
        let matched = userdata[0].user
        console.log(matched)
        const userID = req.body.user
        console.log(userID)
   
  
      
    if(userID===matched){
        const data = await NoteModel.findByIdAndDelete({_id:ID})
            res.send({"msg" : "notes is delete"}) 
    }else{
        res.send({"msg" : "You are not authorized"})
    }
  
    } catch (error) {
        console.log(error)
        res.send({"msg" : "Something went wrongaa","error":error.message})
    }
})

module.exports={
    noteRouter
}

