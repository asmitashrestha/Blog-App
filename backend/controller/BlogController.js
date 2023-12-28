const mongoose = require('mongoose')

const Blog = require('../model/Blog')

// fetch a list of blog
const fetchList = async (req,res)=>{
  let blogList ;
  try{
    blogList = await Blog.find();
  }catch(error){
    console.log(error);
  }

  if(!blogList){
    return res.status(404).json({msg: 'No Blogs Found'})
  }
  return res.status(200).json({blogList})
}


// add a new blog


const addNewBlog =async (req,res)=>{
  const {title,description} = req.body;
  const currentDate = new Date();

  const newBlog = new Blog({
    title,description,date: currentDate
  })

  try{
    await newBlog.save()
  }catch(error){
    console.log(error)
  }

  try{
    const session = await mongoose.startSession();
    session.startTransaction()
    await newBlog.save(session)
    session.commitTransaction()
  }catch(error){
    return res.send(500).json({
      msg:error.message
    })
  }

  return res.status(200).json({newBlog})
}

// Delete from a blog
const deleteBlog =async (req,res)=>{
  const id = req.params.id;
  try{
    const findCurrentBlog = await Blog.findByIdAndDelete(id);
    if(!findCurrentBlog){
      return res.status(404).json({msg : "Blog not found"});
    }
    return res.status(200).json({
      msg:"Successfully deleted!"
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      msg : "Unable to delete ! Please try again"
    })
  }
}

const updateBlog =async (req,res) =>{
  const id = req.params.id;
  const { title, description } = req.body;
  const newDate = new Date();
  let currentBlogToUpdate;
  try{
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id,{
      title,description,date:newDate
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      msg:"Something wen wrong while updating ! Please try again.."
    })
  }
  if(!currentBlogToUpdate){
    return res.status(500).json({
      msg:"Unable to update"
    })
  }

  return res.status(200).json(currentBlogToUpdate);
};

module.exports = {
  fetchList,addNewBlog,deleteBlog,updateBlog
};