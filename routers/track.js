import express from 'express';
import { getTrackById, getTrackByInfo, getTracksByMultiplesIds } from './../controllers/track.js'

const trackRouter = express.Router();

trackRouter.get('/', (req, res)=>{
    res.json({
        'msg':'API to get tracks from db!'
    })
})

trackRouter.get('/query', getTrackByInfo);
trackRouter.get('/ids', getTracksByMultiplesIds);
trackRouter.get('/:id', getTrackById);

export default trackRouter; 