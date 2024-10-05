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