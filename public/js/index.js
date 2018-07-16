let socket = io();

socket.on('connect', function () {
    console.log('connected to Server')
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createAt).format('LT')
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime

    })

    jQuery('#messages').append(html)

    // 
    // let li = jQuery('<li></li>')
    // li.text(`${message.from} @${formattedTime}: ${message.text}`)

    // jQuery('#messages').append(li)
})

// socket.on('newLocationMessage', function(message){
//     let formattedTime = moment(message.createAt).format('LT')
//     let li = jQuery('<li></li>')
//     let a =jQuery('<a target="_blank">My Current Location</a>')

//     li.text(`${message.from}@${formattedTime}: `)
//     a.attr('href', message.url)
//     li.append(a)
//     jQuery('#messages').append(li)
// })
// //New
socket.on('newLocationMessage', function(message) {
    let formattedTime = moment(message.createAt).format('LT');
    let template = jQuery('#location-message-template').html();
    console.log(message)
    let html = Mustache.render(template, {
        url: message.url,
        latitude: message.latitude,
        longitude: message.longitude,
        from: message.from,
        createAt: formattedTime
        });
    jQuery('#messages').append(html);
})


jQuery('#message-form').on ('submit', function(e){
    e.preventDefault()

    let messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not Supported By Browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...')

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location!!\nPermission Denied')
    })
})