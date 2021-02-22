const express = require('express');
const router = express.Router();
const {check}=require("express-validator")


const {
  erstelleaufgabe,Datenholen
} = require('../controller/todoapp-controller');


const validAufgabeUpdate = [
 check("aufgabe","bitte geben")
]
router
    .route('/')
    .get(Datenholen)
        .post(erstelleaufgabe)
       



module.exports = router;
