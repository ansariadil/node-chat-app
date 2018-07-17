let socket = io();

function scrollToBottom(){
    //selectors
    let messages = jQuery('#messages')
    let newMessage = messages.children('li:last-child')
    //height
    let clientHeight = messages.prop('clientHeight')
    let scrollTop = messages.prop('scrollTop')
    let scrollHeight = messages.prop('scrollHeight')
    let newMesaageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMesaageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    let params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function(err){
        if(err){
            alert(err)
            window.location.href='/'
        }else{
            console.log('No error!!!!')
        }
    })
})

socket.on('disconnect', function() {
    console.log('Disconnected from server')
})

socket.on('updateUserList' , function(users){
    let ol = jQuery('<ol></ol>')

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    })

    jQuery('#users').html(ol)
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
    scrollToBottom()

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
    scrollToBottom()
})


jQuery('#message-form').on ('submit', function(e){
    e.preventDefault()

    let messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
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