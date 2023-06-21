const express = require('express');
const router = express.Router();

const { getPayperiods } = require('../controllers/payperiods.controller');

/* GET users listing. */
router.get('/', getPayperiods);

module.exports = router;
