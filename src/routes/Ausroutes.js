const express = require('express')
const router = express.Router()
const { getAusContent}= require('../controllers/Ausctrl.js')

router.get('/', getAusContent)

module.exports= router
