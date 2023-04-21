const postRouter = require('express').Router()
const filterRouter = require('./filterRouter');
const {addPost,getPost,getNeturePost,getPosts,updatePost,deletePost} = require('../controllers/postController');


postRouter.use('/filter', filterRouter)
postRouter.post('/add',addPost);
// postRouter.post('/get-user-posts',addPost);
postRouter.post('/get-one',getPost);
postRouter.post('/get-nature',getNeturePost);
postRouter.get('/get-all',getPosts);
postRouter.put('/update',updatePost);
postRouter.post('/delete',deletePost);


module.exports = postRouter;