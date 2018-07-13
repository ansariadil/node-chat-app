const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '..','public')
// const port = process.env.PORT ||3000

let app = express()

app.use(express.static(publicPath));


app.listen(process.env.PORT ||3000, function(){
    console.log(`Server is up at port ${this.address().port} in ${app.settings.env} mode`)
})