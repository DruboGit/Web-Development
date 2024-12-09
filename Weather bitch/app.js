const express = require('express')
const request = require('request')
const app = express()
const PORT = 3000

app.use(express.static('public'))
app.set('view engine', 'pug')

const apiKey = '81cb7c56b50f14d388d6ce9e78ac1ee1'
let lat = '63.1793655';
let lon = '14.6357061';
let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

let weather
let info = []
let date = 0

request(url, function(err, response, body) {
    if (err) {
        console.log('error', err)
    } else {
        weather = JSON.parse(body)
        date = weather["list"][0]["dt_txt"].slice(0, 10)
    }
})

app.get('/', (req, res) => {
    res.redirect(`/${date}`)
})

app.get('/:page', (req, res) => {
    info = []
    cur_date = ""
    if (req.params.page === "api") {
        res.send(weather["list"])
    } else {
        weather["list"].forEach(i => {
            if (i["dt_txt"].slice(0,10) === req.params.page) {
                day = []
                day.push(i["dt_txt"].slice(11,16))
                day.push(Math.round((i["main"]["temp"] - 273)*10)/10 + "°C")
                day.push(i["weather"][0]["main"])
                day.push(i["wind"]["speed"])
                day.push(i["wind"]["gust"])
                day.push(i["main"]["humidity"])
                cur_date = (i["dt_txt"].slice(0,10))
                info.push(day)
            }
        });
        res.render("index", {info: info, cur_date: cur_date})
}})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})