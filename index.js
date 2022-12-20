import express from 'express';
import router from './routers/index.js';
import connectDB from './db/index.js';
import {} from 'dotenv/config';
import cors from 'cors';

import setupSocket from './sockets/index.js';

const app = express();

// Cors Configuration
const corsOptions = { origin : ['http://127.0.0.1:5173'] } 
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.use('/api', router);
app.use('/', express.static('public'));

try{
	await connectDB(process.env.MONGO_DB_URI);

	const server = await app.listen(port, ()=>{
		console.log(`🚀 Server Started! Listening on Port ${port}`);
    });

	setupSocket(server);

	console.log('🎯 Started Socket!');

}catch (err){
	console.error('❌ Could not connect to database!', err);
}