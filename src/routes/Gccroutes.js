const express = require('express')
const router = express.Router()
const { getGccContent }= require('../controllers/GccCtrl.js')

router.get('/', getGccContent)

module.exports= router
