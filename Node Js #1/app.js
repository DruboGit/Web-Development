const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql2')
const PORT = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'MalteseMan',
    password: 'qwe123!!',
    database: 'dbo'
  })
  
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json())

connection.connect()
  
let currentMessage = "";
let currentData = []

connection.query('SELECT * FROM test', (err, rows, fields) => {
    if (err) throw err
  
    console.log(rows)

    currentData = rows
  })

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , {root : __dirname});
})

app.get('/message', (req, res) => {
    res.send(currentMessage);
})

app.get('/getDatabase', (req, res) =>{
    let html = ""
    html += "<table>"
    html += "<tr><th>ID</th><th>Name</th><th>Adress</th><th>Age</th></tr>"
    for (let i = 0; i < currentData.length; i++){
        html += "<tr>"
        html += "<td>" + currentData[i].id + "</td>"
        html += "<td>" + currentData[i].name + "</td>"
        html += "<td>" + currentData[i].adress + "</td>"
        html += "<td>" + currentData[i].age + "</td>"
        html += "</tr>"
    }
    html += "</table>"
    res.send(html)
})

app.get('/film', (req, res) => {
    res.sendFile('public/rick2.mp4', {root: __dirname})
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

app.post('/sendMessage', (req, res) => {
    currentMessage = req.body["message"]
    console.log(currentMessage)
    res.sendStatus(200)
})