import Track from './../models/track.js';

async function getTrackById(req, res){
    const {id} = req.params;

    if (!id){return res.status(400).json({'msg':'Id was not specified!'});}

    try{
        const track = await Track.findOne({track_id : id});
        
        if(!track){return res.status(404).json({'msg':'No track was found with the given id!'})}

        res.status(200).json({
            'msg':`Getting tracklist with id ${id}`,
            'data': track
        })
    }catch{
        res.status(500).json({
            'msg':'Something went wrong!',
        })
    }

}

async function getTracksThatBestFits(name, artists){
    let pool = [];

    pool = await Track.find({track_name: name});

    if (pool.length === 0){
        pool = await Track.find({artists : artists});
    }else{
        const prevPool = pool;

        pool = pool.filter((song)=>{
            return (song.artists.includes(artists)) }
        );

        if (pool.length === 0){
            pool = prevPool;
        }
    }

    return pool;
}

async function getTrackByInfo(req, res){
    const { name, artists } = req.query;

    if (!name && !artists){return res.status(400).json({
        'msg':'No field <name> or <artists> was specified'
    })}

    const bestFitTracks = await getTracksThatBestFits(name, artists);

    if (!bestFitTracks || bestFitTracks.length === 0){
        return res.status(404).json({
            'msg':'No track was found for the given parameters'
        })
    }

    return res.status(200).json({
        'msg':'Got track that best fit the given parameters',
        data : bestFitTracks,
    })
}

async function getTracksByMultiplesIds(req, res){
    const idList = [].concat(req.query.id);

    if (!idList){
        return res.status(400).json({'msg':'No ids were specified'});
    }

    let data = {};

    for (let i = 0; i < idList.length; i++){
        const id = idList[i];

        let track;
        try{
            track = await Track.findOne({track_id : id});
        }finally{
            data[id] = track;
        }

    }

    return res.status(200).json({
        'msg':'Got tracks by multiple ids',
        'data': data,
    })
}

export { getTrackById, getTrackByInfo, getTracksByMultiplesIds };