const Express = require('express');
const router = Express.Router();
const model = require('./model');

router.get('/:urlId', async (req, res) => {
    try {
        const url = await model.findOne({ urlId: req.params.urlId });
        if (url) {
            url.clicks++;
            url.save();
            return res.redirect(url.origUrl);
        } else res.status(404).json('Url not found.');
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error.');
    }
});

module.exports = router