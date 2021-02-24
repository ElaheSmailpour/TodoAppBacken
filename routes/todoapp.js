const express = require('express');
const router = express.Router();
const { check } = require("express-validator")

const auth = require("../middleware/auth")

const {
  erstelleaufgabe, Datenholen,Datenholenmitid,update,Aufgabelöschen
} = require('../controller/todoapp-controller');


const validAufgabeUpdate = [
  check("aufgabe", "bitte  hier etwas eingeben").not().isEmpty().trim(),

  check ("datum","bitte geben Sie hier Datum!").not().isEmpty().isISO8601()
]
router
  .route('/')
  .get(Datenholen)
  .post(auth,validAufgabeUpdate, erstelleaufgabe)
  
  router.route("/:_id")
  .get(Datenholenmitid)
  .put(auth,validAufgabeUpdate,update)
.delete(auth,Aufgabelöschen)



module.exports = router;
