const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
 

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const egitimBilgisiRoutes = require('./routes/egitim');
const personelRoutes = require('./routes/personel');
const app = express();

/* const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});
 */
const { v4: uuidv4 } = require('uuid');
 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/egitim', egitimBilgisiRoutes);
app.use('/personel', personelRoutes);


app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data =error.data;
  res.status(status).json({ message: message, data:data });
});

mongoose
  .connect(
    'mongodb+srv://alisdemir:DbR4mD9Cgg7vcdN@cluster0.vyp7i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    , { useNewUrlParser: true })
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
