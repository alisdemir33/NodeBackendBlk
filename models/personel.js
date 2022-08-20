const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personelSchema = new Schema({
 
  tckn : {
    type: String,
    required: true,
  },
  
  ad: {
    type: String,
    required: true,
  },
  soyad: {
    type: String,
    required: true,
  }, 

  dogumTarihi :{
    type:Date,
    required:true
  },
  cinsiyet: {
    type: String,
    required: true,
  }, 
  egitimDurumu: {
    type: String,
    required: true,
  }, 
  bolumu: {
    type: String,
    required: true,
  },  

  iseBaslamaTarihi :{
    type:Date,
    required:true
  },

  istihdamSekli: {
    type: String,
    required: true,
  }, 
  personelDurumu: {
    type: String,
    required: true,
  }, 
  aktifPasifDurumu: {
    type: String,
    required: true,
  }, 
  creator: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},
{ timestamps: true } );
module.exports = mongoose.model("Personel", personelSchema);
