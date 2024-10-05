const express = require("express")
const Post = require("../models/Post")
const router = express.Router();

router.post("/",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = new Post({
            title,content,
            author:req.id
        
        })
        let newpost = await post.save()
        res.status(200).json(newpost)
    }catch(error){
        return res.status(500).send("server error")
    }
})

router.get("/",async(req,res)=>{
    try{
        let post = await Post.find().populate('author',['name','email'])
        let allpost = await post.save()
        res.status(200).json(allpost)
    }catch(error){

        res.status(500).json(error)
    }
    
})

router.get("/:id",async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json("no post")
        }
        let newpost = await post.save()
        res.status(200).json(newpost) 
    }catch(error){
        res.status(500).json(error)
    }
})

router.put("/:id",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(500).json("no post")
        }
        post = await Post.findByIdAndUpdate(req.params.id,{title,content},{new:true})
    }catch(error){
        res.status(500).json("server error")
    }
})


router.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id).populate('author',['name','email'])
        if(!post){
            return res.status(500).json("server error")
        }
        post = await post.remove()
        res.status(200).json({msg:"post deleted"})
    }
    catch(error){
        res.status(500).json(error)
    }
})
module.exports = router;