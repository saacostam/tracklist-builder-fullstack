import express from 'express';
import { scrap } from '../controllers/scrap.js';

const scrapRouter = express.Router();

scrapRouter.get('/', (req, res)=>{
    res.json({
        'msg':'API to scrap data from URL!'
    })
})

scrapRouter.get('/html', scrap);

export default scrapRouter; 