const express = require('express')
const router = express.Router()

//Middleware
const { authantication } = require('../middleware/authantication')

//Controller
const user = require('../controllers/user.controllers')
const url = require('../controllers/url.controllers')
const admin = require('../controllers/admin.controllers')
const { authorization } = require('../middleware/authorization')

//API
router.get('/profile', authantication, user.profile)

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/logout', authantication, user.logout)

router.post('/createshorturl', authantication, url.genrateURL)

router.get('/admin', authantication, authorization(true), admin.profile)
router.get('/admin/getalluser', authantication, authorization(true), admin.getAllUser)
router.get('/admin/getallurldetails', authantication, authorization(true), admin.getAllUrlDetails);

router.put('/user/:id') //TODO

router.delete('/user/:id') //TODO

module.exports = router