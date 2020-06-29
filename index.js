//express
var express = require('express')
var app = express()

//get DB profile for the environment
db_hostname=process.env.DB_HOSTNAME
db_username=process.env.DB_USERNAME
db_password=process.env.DB_PASSWORD

console.log(`connect to database. hostname: ${DB_HOSTNAME} username: ${DB_USERNAME}`)

app.get('/', function (req, res) {
    
    response = `
    <html>
    <title>Hello App</title>
    <body style="background-color:coral">
    <p>Hello App!</p>
    <p>Version: 5.0</p>
    </body>
    </html>
    `
    res.send(response)
})

app.listen(8080, function () {
    console.log('app listening on port 8080!')
})

