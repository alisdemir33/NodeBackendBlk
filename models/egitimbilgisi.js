const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*  id: PropTypes.number.isRequired,
      personelId: PropTypes.number.isRequired,
      ogrenimDurumu: PropTypes.string.isRequired,
      okulAdi: PropTypes.string.isRequired,
      bolum: PropTypes.string,
      baslangicYili: PropTypes.number.isRequired,
      bitisYili: PropTypes.number,
      gpa: PropTypes.number,
      aciklama: PropTypes.string,*/ 

const egitimBilgisiSchema = new Schema(
  {   
    ogrenimDurumu: {
      type: String,
      required: true
    },
    okulAdi: {
      type: String,
      required: true
    },
    bolum : {
      type: String,
      required: false
    }, 
    baslangicYili:{
      type:Number,
      required:true
    },
    bitisYili:{
      type:Number,
      required:true
    },
    gpa:{
      type:Number,
      required:true
    },
    aciklama : {
      type: String,
      required: false
    }, 
    personelId: {
      type:Schema.Types.ObjectId,
      ref:'Personel',
      required:true
    },
    creator: {
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    }
  } 
  ,
  { timestamps: true } 
   
);

module.exports = mongoose.model('Egitim', egitimBilgisiSchema);
