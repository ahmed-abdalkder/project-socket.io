
const socketIo=io("http://localhost:3000")

socketIo.on("getpost",(data)=>{
    
    display(data) 
})

$(".createPost").click(()=>{
    let data={
        name:$(".name").val(),
        description:$(".description").val(),
    }
    socketIo.emit("createPost",data)
    clear()
})
let posts=[]

function display(post){
    posts=post
    let box=''
    for (let i = 0; i < post.length; i++) {
        box += `<div class="col-md-3 my-2">
                <div class="p-2 text-center border border-warning-subtle">
                    <h2>${post[i].name}</h2>
                    <p>${post[i].description}</p>
                    <button onclick="deletepost(${i})" class="btn btn-danger btn-sm delete">Delete</button>
                    <button onclick="catchdata(${i})" class="btn btn-success btn-sm update">Update</button>
                </div>   
        </div>`
        
    }
    document.getElementById("rowData").innerHTML=box
}

function deletepost(i){
socketIo.emit("deletepost",{id:posts[i]._id})
}
id=''
function catchdata(i){
    id=posts[i]._id
    $(".name").val(posts[i].name),
    $(".description").val(posts[i].description) 
document.getElementById("createPost").style.display="none"
document.getElementById("updatePost").style.display="block"

    }
    function updatePost(){
        let data={
            id,
            name:$(".name").val(),
            description:$(".description").val(),
        }
        socketIo.emit("updatePost",data)
    document.getElementById("createPost").style.display="block"
document.getElementById("updatePost").style.display="none"
clear()
}     
     
function searsh(data){
 socketIo.emit("search",data)
}  
socketIo.on("search",(data)=>{
display(data)
}) 

function clear(){
   $(".name").val("") ,
     $(".description").val("") 
}