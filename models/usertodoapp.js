const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsertodoSchema = new Schema(
  {
   
      email: String,
      passwort: String

    }
    
  
);

module.exports = mongoose.model("usertodo", UsertodoSchema);