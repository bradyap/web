const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

const router = express.Router()

const model = require('./model')
const baseUrl = 'https://zepr.dev/u'

router.post('/', async (req, res) => {
    const input = req.body.url
    const urlCode = shortid.generate()

    if (validUrl.isUri(input)) {
        try {
            let url = await model.findOne({ origUrl: input })
            if (url) {
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                url = new model({
                    urlId: urlCode,
                    origUrl: input,
                    shortUrl: shortUrl,
                    clicks: 0,
                    date: Date.now()
                })

                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Internal server error.')
        }
    } else {
        res.json('Invalid url.')
    }
})

module.exports = router