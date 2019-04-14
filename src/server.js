const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on ('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://douglas:rocket123@cluster0-1wf2h.mongodb.net/omnistack?retryWrites=true', 
{
    useNewUrlParser:true
})

app.use((req, res) => {
    req.io = io;

    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'))

//Deploy para o Heroku
server.listen(process.env.PORT || 3000);

//Localhost
//server.listen(3000)