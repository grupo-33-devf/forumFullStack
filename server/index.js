import express from 'express'
import { connect } from './config/database.js'
import morgan from 'morgan'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import forumRoutes from './routes/forum.route.js'
import commentRoutes from './routes/comment.route.js'
import likeRoute from './routes/like.route.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000

const api = express()
api.use(cors({
    origin: '*'
}
    /* {
        origin: process.env.FRONTEND_URL,
    } */
));
api.use(morgan('dev')) // logging middleware
api.use(express.json())

api.use('/api/v1', userRoutes);

api.use('/api/v1', postRoute);

api.use('/api/v1', forumRoutes);

api.use('/api/v1', commentRoutes);

api.use('/api/v1', likeRoute);


connect().then(() => {
    api.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`)
    })

})