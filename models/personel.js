const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  }, 
  creator: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});
module.exports = mongoose.model("Personel", userSchema);
