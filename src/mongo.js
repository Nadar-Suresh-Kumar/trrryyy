const mongoose=require("mongoose")


mongoose.connect("mongodb+srv://chitranadar05:U7tNscGTUpYCiNKl@backenddb.enp5odq.mongodb.net/LoginFormPractice?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    scored:{
        type:Number,
        required:false
    }
 
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection