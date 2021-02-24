const express = require('express');
const router = express.Router();
const { check } = require("express-validator")

const auth = require("../middleware/auth")


const {
  erstelleaufgabe, Datenholen, Datenholenmitid, update, Aufgabelöschen, nutzerEinloggen
} = require('../controller/usertodoapp-controller');


const validAufgabeUpdate = [
  check('vorname').not().isEmpty().withMessage('Vorname muss angegeben werden.').trim(),
  check('nachname').not().isEmpty().withMessage('Nachname muss angegeben werden.').trim(),
  check("email", "geben Sie bitte Ihre email!").trim().isEmail(),
  check("passwort", "geben Sie bitte Ihre passwort!").not().isEmpty().isStrongPassword()
]
const validUserUpdate = [
  check('vorname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Vorname muss angegeben werden.')
    .trim(),
  check('nachname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Nachname muss angegeben werden.')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .optional()
    .trim()
    .normalizeEmail(),
  check('passwort')
    .not()
    .isEmpty()
    .optional()
    .isStrongPassword()
    .withMessage('Passwort muss angegeben werden.')
    .trim(),
   
];

router
  .route('/')
  .get(Datenholen)
  .post(validAufgabeUpdate, erstelleaufgabe)

router.route("/:_id")
  .get(Datenholenmitid)
  .put(auth, validUserUpdate, update)
  .delete(auth, Aufgabelöschen)
router.route('/login').post(nutzerEinloggen)



module.exports = router;
