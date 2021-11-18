require('./modles/db')

const express = require('express')

const app = express()
const path = require('path')
const {engine} = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyparser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const userContoler = require('./routes/userControler')

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())
app.set('views',path.join(__dirname, './views/'))
app.engine('hbs',engine({extname:'hbs', defaultLayout: 'mainlayout',handlebars: allowInsecurePrototypeAccess(Handlebars),layoutsDir: __dirname + '/views/layouts/'}))
app.set('view engine', 'hbs')
app.use('/', userContoler)
app.listen(3000,() =>{
    console.log ('app started on port 3000')
})