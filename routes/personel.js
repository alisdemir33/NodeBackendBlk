const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')

const personelController = require('../controllers/personel');

const router = express.Router();

// post /personel/personellistesi
router.post('/personellistesi',isAuth,
personelController.getPersonelListByPage);

module.exports =router;