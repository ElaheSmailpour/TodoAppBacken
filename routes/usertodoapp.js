const express = require('express');
const router = express.Router();
const { check } = require("express-validator")


const {
  erstelleaufgabe, Datenholen,Datenholenmitid,update,Aufgabelöschen
} = require('../controller/usertodoapp-controller');


const validAufgabeUpdate = [
  check("email", "geben Sie bitte Ihre email!").trim().isEmail(),

  check ("passwort","geben Sie bitte Ihre passwort!").not().isEmpty().isStrongPassword()
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
