const path = require('path')
const express = require('express')

let publicPath = path.join(__dirname + '/../public')
const port = process.env.POST ||3000

let app = express()

app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`Server is up at port ${3000}`)
})