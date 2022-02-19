const Express = require('express');
const router = Express.Router();
const model = require('./model');
const { page } = require('./page.js');

router.get('/:pasteId', async (req, res) => {
    try {
        const paste = await model.findOne({ pasteId: req.params.pasteId });
        if (paste) {
            res.send(page(paste));
        } else {
            res.status(404).json('Paste not found.')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error.');
    }
});

router.get('/', async (req, res) => {
    try {
        res.send(page());
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error.');
    }
});

module.exports = router