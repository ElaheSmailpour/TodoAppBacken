const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    aufgabe: String,
   
  }
);

module.exports = mongoose.model("todo", TodoSchema);