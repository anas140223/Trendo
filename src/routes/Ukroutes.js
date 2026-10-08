const express= require('express')
const router = express.Router()
const {getUkcontent} = require('../controllers/Ukctrl.js')

router.get('/', getUkcontent )

module.exports= router
