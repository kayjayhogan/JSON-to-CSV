const controllers = require('./controller.js');
const express = require('express');
const router = express.Router();

router
  .route('')
  .get(controllers.get)
  .post(controllers.post)


module.exports = router;