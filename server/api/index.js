const express = require('express');

const router = express.Router();

router.use('/account', require('./account'));
router.use('/posts', require('./post'));
router.use('/products', require('./product'));
router.use('/search', require('./search'));
router.use('/auth', require('./auth'));
router.use('/business', require('./business'));

module.exports = router;
