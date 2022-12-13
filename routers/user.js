import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
    res.json({
        'msg':'Specify ID to get the user information!'
    })
})

export default userRouter;