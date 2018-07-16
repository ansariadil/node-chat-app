const moment = require('moment')

let date = moment()
//MMM DD(th), YYYY HH:MM:SS
console.log(date.format('MMM Do, YYYY HH:MM:SS'))
//Day, Mon date, Year time(AM PM)
console.log(date.format('llll')) 
//time(AM PM)
console.log(date.format('LT'));