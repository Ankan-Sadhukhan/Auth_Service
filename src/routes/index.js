const express = require('express');

const viApiRoutes = require('./v1/index')
const router = express.Router();

router.use('/v1',viApiRoutes);

module.exports = router;