const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
   
      aufgabe: String,
      datum: Date

    }
    
  
);

module.exports = mongoose.model("todo", TodoSchema);