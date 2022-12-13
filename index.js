import express from 'express';
import router from './routers/index.js';
import connectDB from './db/index.js';
import {} from 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;

app.use('/api', router);
app.use('/docs', express.static('docs'));

try{
	await connectDB(process.env.MONGO_DB_URI);
	app.listen(port, ()=>{
		console.log(`🚀 Server Started! Listening on Port ${port}`);
    })
}catch (err){
	console.error('❌ Could not connect to database!', err);
}