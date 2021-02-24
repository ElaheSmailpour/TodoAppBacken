const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsertodoSchema = new Schema(
  {
    vorname: String,
    nachname: String,
      email: String,
      passwort: String

    }
    
  
);

module.exports = mongoose.model("usertodo", UsertodoSchema);