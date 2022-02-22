const express = require('express')
const shortid = require('shortid')

const router = express.Router()

const model = require('./model')
const baseUrl = 'https://zepr.dev/p'

router.post('/', async (req, res) => {
    const input = req.body.data
    
    try {
        if (req.body.pid) {
            const pasteId = req.body.pid
            const paste = await model.findOne({ pasteId: pasteId });
            if (paste) {
                paste.clicks++;
                paste.data = input;

                paste.save();
                res.json(paste)
            } else {
                res.status(404).json('Paste not found.')
            }
        } else {
            const pasteId = shortid.generate()
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
        }
    } catch (err) {
        console.log(err)
        res.status(500).json('Internal server error.')
    }
})

router.get('/:pasteId', async (req, res) => {
    try {
        const paste = await model.findOne({ pasteId: req.params.pasteId });
        if (paste) {
            res.json(paste);
        } else {
            res.status(404).json('Paste not found.')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error.');
    }
});

module.exports = router