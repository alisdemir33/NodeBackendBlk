const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Personel = require("../models/personel");
const User = require("../models/user");

exports.getPersonelList = async (req, res, next) => {
  try {
    ;debugger
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