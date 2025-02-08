
import express from 'express';
import { Server } from "socket.io";
import connectionDB from './db/connectiondb.js';
import postmodel from './db/models/postmodle.js';

const app = express()

const port = 3000

connectionDB()

app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
 
const io = new Server(server,{cors:"*"});

io.on("connection",(socket)=>{

    async function grtpost(){

        const post = await postmodel.find({})

        socket.emit("getpost",post)
    }

    grtpost()

    socket.on("createPost",async(data)=>{

     const{name,description} = data

     await postmodel.create({name,description})

     grtpost()

    })

    socket.on("deletepost",async(data)=>{

        const{id} = data

        await postmodel.findByIdAndDelete({_id: id})

        grtpost()

       }) 

       socket.on("updatePost",async(data)=>{

        const{id,name,description} = data

        await postmodel.findByIdAndUpdate({_id:id},{name,description})

        grtpost()

       })  

       socket.on("search",async(data)=>{


        const post=await postmodel.find({

            $or:[
               {name:{$regex:data,$options:"i"}},
               {description:{$regex:data,$options:"i"}},
            ]
        })

        socket.emit("search",post)

    })


})