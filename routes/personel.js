const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')

const personelController = require('../controllers/personel');

const router = express.Router();

// GET /personel/personel
router.get('/personellistesi',isAuth,
personelController.getPersonelList);

module.exports =router;