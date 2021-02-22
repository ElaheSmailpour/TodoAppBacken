const express = require('express');
const router = express.Router();
const { check } = require("express-validator")


const {
  erstelleaufgabe, Datenholen,Datenholenmitid,update,Aufgabelöschen
} = require('../controller/todoapp-controller');


const validAufgabeUpdate = [
  check("aufgabe", "bitte  hier etwas eingeben").not().isEmpty().trim()
]
router
  .route('/')
  .get(Datenholen)
  .post(validAufgabeUpdate, erstelleaufgabe)
  
  router.route("/:_id")
  .get(Datenholenmitid)
  .put(validAufgabeUpdate,update)
.delete(Aufgabelöschen)



module.exports = router;
