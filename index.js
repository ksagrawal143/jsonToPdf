const express = require('express')
const app = express()
const createTable = require('./pdf')
const pdf = require('html-pdf')
const { response } = require('express')
const config = require('dotenv').config()

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  


app.post('/getPdf', (request, response) => {
    try {
        let req = request.body
        console.log(req)
        let html = createTable(req)
        console.log(html)
        var options = { width: '56mm' }
        pdf.create(html, options).toStream((err, stream) => {
            if (err)
                return console.log(err)
            response.status(200)
            stream.pipe(response)
        })
    } catch (error) {
        console.log(error)
        response.status(401).send("Error!")
    }
})

app.post('/', (request, response) => {
    console.log(request.body)
    response.status(200).send("post mil gaya")
})

app.get('/', (request, response) => {
    console.log("Hi")
    response.status(200).send('hi')
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
