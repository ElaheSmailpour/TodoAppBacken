const express = require('express');
const router = express.Router();
const { check } = require("express-validator")

const auth = require("../middleware/auth")

const {
  erstelleaufgabe, Datenholen, Datenholenmitid, Aufgabelöschen, erledigt, markierteaufgabe
} = require('../controller/todoapp-controller');


const validAufgabeUpdate = [
  check("aufgabe", "bitte  hier etwas eingeben").not().isEmpty().trim(),

  check("datum", "bitte geben Sie hier Datum!").not().isEmpty().isISO8601(),

  check('erledigt').optional().isBoolean()
]
const validAufgabeUpdate1 = [
  check("aufgabe", "bitte  hier etwas eingeben").not().isEmpty().trim().optional(),

  check("datum", "bitte geben Sie hier Datum!").not().isEmpty().isISO8601().optional(),

  check('erledigt').optional().isBoolean().optional()
]
router
  .route('/')
  .get(auth, Datenholen)
  .post(auth, validAufgabeUpdate, erstelleaufgabe)

router.route('/erledigt').get(auth, erledigt)

router.route("/:_id")
  .get(Datenholenmitid)
  .put(auth,validAufgabeUpdate1, markierteaufgabe)
 
  .delete(auth, Aufgabelöschen)



module.exports = router;
