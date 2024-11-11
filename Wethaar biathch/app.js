const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.redirect('/obamna')
})

app.get('/obamna', (req, res) => {
    let data = {
    title: "Obamna",
    picture: "obamna.jpg",
    width: "300",
    text: "Obamna was the president of the united states sometime during the last 100 years, idk",
    button_text: "Ryan",
    button_link: "/ryan"
    }
    res.render("index", data)
})

app.get('/ryan', (req, res) => {
    let data = {
    title: "Ryan Reynolds",
    picture: "ryan.jpg",
    width: "200",
    text: "Ryan Reynolds is considered to be the hottest man alive by many people, he is also an actor",
    button_text: "Obamna",
    button_link: "/obamna"
    }
    res.render("index", data)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})