const express = require("express")
const { createTodo } = require("./types")
const { updateTodo } = require("./types")
const { todo } = require("./db")

const app = express()
const port = 3000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome!")
})

app.post("/todo", async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "created todo"
    })

})

app.get("/todos", async(req,res)=>{
    const todos = await todo.find({})
    res.json({
        todos
    })
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
    todo.update({
        _id: req.body.id
    },{
        completed: true
    })
})

app.listen(port, ()=>{
    console.log("Server running on port ", port)
})