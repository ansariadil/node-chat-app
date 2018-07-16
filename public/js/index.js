let socket = io();

socket.on('connect', function () {
    console.log('connected to Server')

    socket.emit('createMessage', {
        from: 'Adil',
        text: 'This is Adil Ansari'
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
    console.log('newMessage: \n', message)
})