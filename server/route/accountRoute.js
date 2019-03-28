const express = require('express');
const router = express.Router();

const accountController = require('../controller/accountController');

router.get('/:accountId', accountController.getAccountById);
router.post('/', accountController.createAccount);

module.exports = router;