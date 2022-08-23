const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Personel = require("../models/personel");
const User = require("../models/user");

exports.getPersonelList = async (req, res, next) => {
  try {

    const currentPage = req.query.page || 1;
    const perPage = 5;
    let totalItems;
    const count = await Personel.find().countDocuments();

    totalItems = count;
    const personelList = await Personel.find();

    res.status(200).json({
      message: "Fetched Personel List successfulllllly.",
      personelList: personelList,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getPersonelListByPage = async (req, res, next) => {
  try {
   
    const currentPage = req.body.pageInfo.pageNumber || 1;
    const perPage = req.body.pageInfo.pageSize;
    let totalItems;
   

    let conditions ={creator: req.userId };
    if(req.body.ad){
      conditions = {...conditions, "ad":req.body.ad}
    }

    if(req.body.tckn){
      conditions = {...conditions, "ad":req.body.tckn}
    }

    const count = await Personel.find(conditions).countDocuments();

    const personelList = await Personel.find(conditions)
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

   
/*     const personelList = await Personel.find({ creator: req.userId })
      .skip((currentPage - 1) * perPage)
      .limit(perPage); */

      totalItems =count;

   /*  totalItems = count;
    const personelList = await Personel.find(); */

    res.status(200).json({
      message: "Fetched Personel List successfulllllly.",
      personelList: personelList,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


