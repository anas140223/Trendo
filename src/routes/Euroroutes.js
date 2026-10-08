const express= require('express')
const router = express.Router()
const { getEurocontent }= require('../controllers/Euroctrl.js')

router.get('/', getEurocontent)

module.exports= router
