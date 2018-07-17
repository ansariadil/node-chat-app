const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const publicPath = path.join(__dirname, '..','public')
const port = process.env.PORT ||3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
          return callback('Following Values Must be Secified.\n1. Name\n2. Room Name')
        }//else if(!isRealString(params.room) || isRealString(params.name)){
        //     callback('Room Name is Required')
        // }else if(!isRealString(params.name) || isRealString(params.room)){
        //     callback('Name is required')
        // }
        console.log(`${params.name} is connected.`) //new
        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the ${params.room} Chat Room`))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the Chat`) )
        
        callback()
    })

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id)

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        }
        callback()
        //following code will broadcat message to all except sender
        // socket.broadcast.emit('newMessage', {
        //     ffrom: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // })
    })

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)
        
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }     
    })

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the Room`))
        }
        console.log(`${user.name} is Disconnected`)
    })
})

// server.listen(process.env.PORT ||3000, function(){
//     console.log(`Server is up at port ${this.address().port} in ${app.settings.env} mode`)
// })
server.listen(port, () => {
    console.log(`Server is running at ${port}`)
})