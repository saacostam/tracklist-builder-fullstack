import connectDB from "../../db/index.js";
import Track from "../../models/track.js";

import {} from 'dotenv/config';
import fs from 'fs';
import {parse} from 'csv-parse';

try{
    await connectDB(process.env.MONGO_DB_URI);
    
    fs.createReadStream("./dataset.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            const track_id = row[1];
            const raw_artists = row[2];
            const album_name = row[3];
            const track_name = row[4];
            const popularity = row[5];
            const duration_ms = row[6];
            const explicit = row[7].toLowerCase();
            const danceability = row[8];
            const energy = row[9];
            const key = row[10];
            const loudness = row[11];
            const mode = row[12];
            const speechiness = row[13];
            const acousticness = row[14];
            const instrumentalness = row[15];
            const liveness = row[16];
            const valence = row[17];
            const tempo = row[18];
            const time_signature = row[19];
            const track_genre = row[20];

            // Parsing
            const artists = raw_artists.split(';');
            
            Track.create({
                track_id, artists, album_name, track_name, popularity,
                duration_ms, explicit, danceability, energy, key, loudness,
                mode, speechiness, acousticness, instrumentalness, liveness,
                valence, tempo, time_signature, track_genre
            });
        })
        .on("end", function () {
            console.log("finished");
        })
        .on("error", function (error) {
            console.log(error.message);
        });

}catch (err){
	console.error('❌ Could not connect to database!', err);
}