const express = require('express');

const router = express.Router();

router.use('/account', require('./account'));
router.use('/post', require('./post'));
router.use('/product', require('./product'));
router.use('/search', require('./search'));
router.use('/auth', require('./auth'));

module.exports = router;
