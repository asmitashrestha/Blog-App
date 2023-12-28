const express = require('express');
const blogRouter = express.Router();
const { fetchList, addNewBlog, deleteBlog, updateBlog } = require('../controller/BlogController');

blogRouter.get('/',fetchList)
blogRouter.post('/add', addNewBlog)
blogRouter.delete('/delete/:id',deleteBlog)
blogRouter.put('/update/:id',updateBlog)

module.exports = blogRouter;