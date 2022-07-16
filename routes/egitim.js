const express = require('express');
const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')

const egitimController = require('../controllers/egitim');

const router = express.Router();

// GET /feed/posts
router.get('/egitimbilgisi',isAuth,
 egitimController.getEgitimBilgisiList);

// POST /feed/post
router.post(
  '/egitimbilgisi',isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 2 }),
    body('surname')
      .trim()
      .isLength({ min: 2 })
  ],
  egitimController.createEgitimBilgisi
);

router.get('/egitimbilgisi/:egitimbilgisiId', isAuth, 
egitimController.getEgitimBilgisi);

router.put(
  '/egitimbilgisi/:egitimbilgisiId',isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 2 }),
    body('surname')
      .trim()
      .isLength({ min: 2 })
  ],
  egitimController.updateEgitimBilgisi
);

router.delete('/egitimbilgisi/:egitimbilgisiId',isAuth,
egitimController.deleteEgitimBilgisi);

module.exports = router;
