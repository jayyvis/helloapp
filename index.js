//express
var express = require('express')
var app = express()

//TODO: fetch it from kube secrets
db_hostname='dh'
db_password='dp'

console.log(`connect to database. host: ${db_hostname} password: ${db_password}`)

app.get('/', function (req, res) {
    
    response = `
    <html>
    <title>Hello App</title>
    <body style="background-color:coral">
    <p>Hello App!</p>
    <p>Version: 4.0</p>
    </body>
    </html>
    `
    res.send(response)
})

app.listen(8080, function () {
    console.log('app listening on port 8080!')
})

