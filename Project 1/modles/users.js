// Define data Structure 
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'this field is required'
    },
    email: {
        type:String
    },
    city: {
        type:String
    }
})
// Email Validation
userSchema.path('email').validate((val) =>{
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val)
}, 'invalid e-mail')

mongoose.model('users', userSchema)