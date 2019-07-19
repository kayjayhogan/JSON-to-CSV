const controller = require('./controller.js');
const express = require('express');
const router = express.Router();

router
  .route('')
  .get(controller.get)
  .post(controller.post)


module.exports = router;