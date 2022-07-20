const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Egitim = require("../models/egitimbilgisi");
const User = require("../models/user");

exports.getEgitimBilgisiList = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 5;
    let totalItems;
    const count = await Egitim.find().countDocuments();

    totalItems = count;
    const egitimBilgisiList = await Egitim.find();
   
    res.status(200).json({
      message: "Fetched Egitim Bilgisi successfulllllly.",
      egitimBilgisiList: egitimBilgisiList,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createEgitimBilgisi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  /*  id: PropTypes.number.isRequired,
      personelId: PropTypes.number.isRequired,
      ogrenimDurumu: PropTypes.string.isRequired,
      okulAdi: PropTypes.string.isRequired,
      bolum: PropTypes.string,
      baslangicYili: PropTypes.number.isRequired,
      bitisYili: PropTypes.number,
      gpa: PropTypes.number,
      aciklama: PropTypes.string,*/ 
 
  const okulAdi = req.body.okulAdi;
  const bolum = req.body.bolum;
  const ogrenimDurumu = req.body.ogrenimDurumu;
  const baslangicYili = req.body.baslangicYili;
  const bitisYili = req.body.bitisYili;
  const gpa = req.body.gpa;
  const aciklama = req.body.aciklama; 
  const userId = req.body.creator; 
  const personelId = req.params.personelId;

  let creator;

  const egitimBilgi = new Egitim({
    okulAdi: okulAdi,
    bolum: bolum,
    ogrenimDurumu: ogrenimDurumu,
    baslangicYili:baslangicYili,
    bitisYili:bitisYili,
    gpa:gpa,
    aciklama:aciklama,
    personelId: personelId,//req.personelId,
    creator:userId
  });

  return egitimBilgi
    .save()  
    .then((result) => {
      res.status(201).json({
        message: "EgitimBilgisi created successfully!",
        egitimBilgi: egitimBilgi,
        creator: { _id: req.userId },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getEgitimBilgisi= (req, res, next) => {
  const egitimBilgisiId = req.params.egitimBilgisiId;
  EgitimBilgisi.findById(egitimBilgisiId)
    .then((egitimBilgisi) => {
      if (!egitimBilgisi) {
        const error = new Error("Could not find EgitimBilgisi.");
        error.statusCode = 405;
        throw error;
      }
      res.status(200).json({ message: "EgitimBilgisi fetched.", egitimBilgisi: egitimBilgisi });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateEgitimBilgisi = (req, res, next) => {
  const egitimBilgisiId = req.params.egitimBilgisiId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  let surname = req.body.surname;
  let phone = req.body.phone;
  let creator;  

  EgitimBilgisi.findById(egitimBilgisiId)
    .then((egitimBilgisi) => {
      if (!egitimBilgisi) {
        const err = new Error("Egitim Bilgisi Not Found!");
        err.statusCode = 404;
        throw err;
      }

      if (egitimBilgisi.creator.toString() !== req.userId) {
        const err = new Error("Not Authorized!");
        err.statusCode = 403;
        throw err;
      }
    

      egitimBilgisi.name = name;
      egitimBilgisi.surname = surname;
      egitimBilgisi.phone = phone;

      return egitimBilgisi.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Egitim Bilgisi updated", egitimBilgisi: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/* exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.imageUrl = imageUrl;    
      post.content = content;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}; */

exports.deleteEgitimBilgisi = (req, res, next) => {
  const egitimBilgisiId = req.params.egitimBilgisiId;
  EgitimBilgisi.findById(egitimBilgisiId)
    .then((egitimBilgisi) => {
      //check user
      if (!egitimBilgisi) {
        const error = new Error("Could not find Egitim Bilgisi.");
        error.statusCode = 404;
        throw error;
      }
      if (egitimBilgisi.creator.toString() !== req.userId) {
        const err = new Error("Not Authorized!");
        err.statusCode = 403;
        throw err;
      }
    
      return EgitimBilgisi.findByIdAndRemove(egitimBilgisi);
    })   
    .then((result) => {
      res.status(200).json({ message: "Egitim Bilgisi Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

