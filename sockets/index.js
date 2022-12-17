import { Server } from "socket.io";
import { getSimilarTracksUtil } from './../controllers/track.js'

function setupSocket( webServer ){
    const io = new Server( webServer, {
        cors: {
          origin: "http://127.0.0.1:5173",
          methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket)=>{
        socket.emit('connection-success', true);

        socket.on('find-similar-tracks', async (track, alpha)=>{
            try{
                const tracks = await getSimilarTracksUtil(track, alpha);
                socket.emit('return-simliar-tracks', tracks);
            }catch(e){
                socket.emit('return-simliar-tracks', []);
            }
        })
    })
}

export default setupSocket;