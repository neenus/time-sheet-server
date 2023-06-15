var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      title: "Express",
      message: "Welcome to the server!"
    });
});

module.exports = router;
