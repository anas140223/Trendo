const express = require('express')
const router = express.Router()
const { getContent } = require('../controllers/Usactrl.js')

router.get('/', getContent)

module.exports = router
