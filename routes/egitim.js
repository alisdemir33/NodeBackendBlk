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
  '/:personelId/egitimbilgisi',isAuth,
  [
    body('aciklama')
      .trim()
      .isLength({ min: 2 }),
    body('bolum')
      .trim()
      .isLength({ min: 2 })
  ],
  egitimController.createEgitimBilgisi
);

router.get('/egitimbilgisi/:egitimbilgisiId', isAuth, 
egitimController.getEgitimBilgisi);

router.put(
  '/egitimbilgisi/:egitimBilgisiId',isAuth,
  [
    body('aciklama')
      .trim()
      .isLength({ min: 2 }),
    body('bolum')
      .trim()
      .isLength({ min: 2 })
  ],
  egitimController.updateEgitimBilgisi
);

router.delete('/egitimbilgisi/:idList',isAuth,
egitimController.deleteEgitimBilgisiList);

module.exports = router;
