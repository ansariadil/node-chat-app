const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT ||3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New USerConnected')

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat Roon',
        createAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
        //following code will broadcat message to all except sender
        // socket.broadcast.emit('newMessage', {
        //     ffrom: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
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