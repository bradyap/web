const express = require('express')
const shortid = require('shortid')

const router = express.Router()

const model = require('./model')
const baseUrl = 'https://zepr.dev/p'

router.post('/', async (req, res) => {
    const input = req.body.data
    const pasteId = shortid.generate()

    try {
        const url = baseUrl + '/' + pasteId
        paste = new model({
            pasteId: pasteId,
            data: input,
            url: url,
            clicks: 0,
            date: Date.now()
        })
            
        await paste.save()
        res.json(paste)
    } catch (err) {
        console.log(err)
        res.status(500).json('Internal server error.')
    }
})

module.exports = router