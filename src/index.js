const app = require('express')();
const http = require('http').Server(app);
require('dotenv').config();
const io = require('socket.io')(http, {
    cors: {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST'] 
    }
});

const PORT = process.env.PORT || 8000;

// events
io.on('connection', (socket) => {
    console.log('user connect');
    socket.on('sendMessage', (message) =>{
        // console.log('message -->', message);
        socket.broadcast.emit('reciveMessage', message);
    });
});

app.get('/', (req, res) =>{
    res.send('hola')
});

http.listen(PORT,() => console.log(`Listen in port ${PORT}`));