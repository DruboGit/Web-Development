const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const PORT = 3000

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'MalteseMan',
    password: 'qwe123!!',
    database: 'dbo'
})

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , {root : __dirname});
})

app.get('/getMessage', (req, res) => {
    connection
    .promise()
    .query('SELECT * FROM messages')
    .then(([rows, fields]) => {
        console.log(rows)
        res.send(rows)
        })
        .catch(console.log)
})

app.post('/sendMessage', (req, res) => {
    let timestamp = Math.floor(Date.now() / 1000)
    console.log(req.body)
    connection
        .promise()
        .query(`INSERT INTO messages(message, username, time) VALUES ("${req.body.message}", "${req.body.username}", "${timestamp}")`)
        .then(([rows, fields]) => {
            res.sendStatus(200)
        })
        .catch(console.log)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})