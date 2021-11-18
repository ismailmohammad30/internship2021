// connect to database locally

const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/usersDB', {useNewUrlParser: true},(err) =>{
    if(!err) { 
        console.log('there is no errors yaaaay')
}else {
    console.log('there is an '+ err)
}
})

require('./users')