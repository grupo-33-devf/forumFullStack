import express from 'express'
import * as postController from '../controller/post.controller.js'
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { uploadFiles, multerErrorHandler } from '../middlewares/multerUploadFile.midleware.js';
const postRoute = express.Router();

// create a post with auth validation middleware  to get user id 
postRoute.post('/post', isAuth, multerErrorHandler(uploadFiles), postController.createPost);

// get all posts
postRoute.get('/post',isAuth,isAdmin, postController.getAllPosts);

// get post by id
postRoute.get('/post/:postId', postController.getPostById);

// update post by id with auth validation middleware
postRoute.patch('/post/:postId',isAuth,  postController.updatePostById);

// delete post by id with auth validation middleware
postRoute.delete('/post/:postId',isAuth, postController.deletePostById);


export default postRoute