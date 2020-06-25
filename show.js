const express = require('express')
const app = express()

http = require('http'),
app.set('view engine', 'pug');

var a='abccd'

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: a })
  })


app.listen(4000, () => console.log('Example app listening on port 4000!'))  