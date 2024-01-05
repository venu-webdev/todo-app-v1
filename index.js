

const express = require("express")
const { createTodo } = require("./types")
const { updateTodo } = require("./types")

const app = express()
const port = 3000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.post("/todo", (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put in mongodb
})

app.get("/todos",(req,res)=>{

})

app.put("/completed",(req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent wrong inputs",
        })
        return;
    } 
})

app.listen(port, ()=>{
    console.log("Server running on port ", port)
})