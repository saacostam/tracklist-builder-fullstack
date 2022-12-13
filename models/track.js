import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    track_id : String,
    artists : [String],
    album_name : String,
    track_name : String,
    popularity : Number,
    duration_ms : Number,
    explicit : Boolean,
    danceability : Number, 
    energy : Number, 
    key : Number,
    loudness : Number,
    mode : Number, 
    speechiness : Number,
    acousticness : Number,
    instrumentalness : Number,
    liveness : Number, 
    valence : Number,
    tempo : Number,
    time_signature : Number,
    track_genre : String,
})

const TrackModel = mongoose.model('Track' , trackSchema);

export default TrackModel; 