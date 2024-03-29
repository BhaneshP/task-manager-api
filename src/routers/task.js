const express=require('express')
const auth=require('../middleware/auth')
const Task=require('../models/task')
const router=new express.Router()

router.post('/tasks',auth,async (req,res)=>{
    // const task=new Task(req.body)
    const task=new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{
    const match={}

    if(req.query.completed){                            //No matter what we give true or false in query it'll work as the query send string always not boolean so if it send string (true or false) it means the req.query.completed sends something which means true and if there is no query send it means false
        match.completed=req.query.completed==='true'
                            //if req.query.completed is true the object match will get true values or if req.query. is false then false===true return false so the match object will have false values
    }
    try{
        // const tasks= await Task.find({owner:req.user._id})

        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id

    try{
        const task= await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(404).send({error:'Invalid updates!'})
    }

    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])

        await task.save()
        // const task=await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
       

        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        
        
        if(!task){
            return res.status(404).send()
        }
       
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports=router