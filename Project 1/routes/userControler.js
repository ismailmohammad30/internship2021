const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = mongoose.model('users')

router.get('/', (req, res) => {
    res.render("../views/users/addOrEditUsers.hbs", {
        viewTitle: "Insert User"
    })
})
router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertUsers(req, res)
    } else {
        updateUsers(req, res)
    }
})

function updateUsers(req, res) {
    Users.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/list')
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render('/add', {
                    viewTitle: 'Update user',
                    user: req.body
                })
            } else {
                console.log('this is' + err)
            }
        }
    })
}
// function to get data from form 
function insertUsers(req, res) {
    const users = new Users()
    users.fullName = req.body.fullName
    users.email = req.body.email
    users.city = req.body.city
    users.save((err, doc) => {
        if (!err) {
            res.redirect('/list')
        } else {
            if (err.name = 'validationError') {
                handleValidationError(err, req.body)
                res.render('../views/users/addOrEditUsers.hbs', {
                    viewTitle: 'Inser Users',
                    user: req.body
                })
            }
        }
    })
}
router.get('/list', (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.render('../views/users/list.hbs', {
                list: docs
            })
        }
    })
})

// Update the user 
router.get('/:id', (req, res) => {
    Users.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('../views/users/addOrEditUsers.hbs', {
                viewTitle: 'Update user',
                user: doc
            })
        }
    })
})
//Delete the user 
router.get('/delete/:id',(req,res)=>{
    Users.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/list')
        }else{
            console.log('error to delete')
        }
    })
})
// validation 
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message
                break
            case 'email':
                body['emailError'] = err.errors[field].message
                break
            default:
                break
        }
    }
}

module.exports = router