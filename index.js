require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require('mongoose')
const UserModel=require('./models/Users')
const PORT=process.env.PORT;
const cors=require("cors");
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
 });
 app.use(express.json())
 app.use(cors());

app.get("/getUsers",async(req,res)=>{
    
      const record=await UserModel.find({});
      res.send(record);
    
})

app.post("/createUser",async(req,res)=>{
    const record=req.body;
    console.log(record);
    const createdBook=await UserModel.create(record);
    res.send(createdBook);

})

app.delete("/deleteUser/:name",async(req,res)=>{
    const {name:taskID}=req.params;

    const record=req.body;
    const deleteBook=await UserModel.deleteOne({name:taskID},record,{
        new:true,
        runValidators:true,
    });
    res.send(deleteBook);
    console.log(deleteBook)  

})




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT},`);

})
