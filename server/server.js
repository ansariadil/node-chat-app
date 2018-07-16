const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT ||3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New USerConnected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat Room'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server')
        //following code will broadcat message to all except sender
        // socket.broadcast.emit('newMessage', {
        //     ffrom: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log("User is Diconnected")
    })
})

// server.listen(process.env.PORT ||3000, function(){
//     console.log(`Server is up at port ${this.address().port} in ${app.settings.env} mode`)
// })
server.listen(port, () => {
    console.log(`Server is running at ${port}`)
})