import { Server } from "socket.io";

function setupSocket( webServer ){
    const io = new Server( webServer, {
        cors: {
          origin: "http://127.0.0.1:5173",
          methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket)=>{
        socket.emit('hello', 'hello world');

        socket.on('select-track', ()=>{
            console.log('select-track');
        })
    })
}

export default setupSocket;