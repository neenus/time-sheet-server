const express = require('express');
const router = express.Router();

const { getEmployees, addEmployee } = require('../controllers/employees.controller');

/* GET employees listing. */
router.get('/', getEmployees);

/* POST add new employee. */
router.post('/', addEmployee);

module.exports = router;
