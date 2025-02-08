import   mongoose from "mongoose";

const postschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
},{timestamps:true,
    versionKey:false
})
const postmodel=mongoose.model("post",postschema)
export default postmodel