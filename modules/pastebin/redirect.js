const Express = require('express');
const router = Express.Router();
const model = require('./model');

router.get('/:pasteId', async (req, res) => {
    try {
        const paste = await model.findOne({ pasteId: req.params.pasteId });
        if (paste) {
            paste.clicks++;
            paste.save();
            return res.send(paste.data);
        } else res.status(404).json('Paste not found.');
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error.');
    }
});

module.exports = router