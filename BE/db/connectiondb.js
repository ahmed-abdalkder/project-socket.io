import   mongoose from "mongoose";

const connectionDB=()=>{

    mongoose.connect("mongodb://localhost:27017/socket-io")

    .then(()=>{

        console.log("connection database");
        
    }).catch((err)=>{
        
        console.log({msg:"error",error});
        
    })
}
export default connectionDB