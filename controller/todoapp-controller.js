
const { validationResult } = require('express-validator')
const TodoApp = require("../models/todoappmodel")

//get
exports.Datenholen = (req, res, next) => {
	TodoApp.find().then((ergebnis) => {
		res.status(200).send(ergebnis)
	})
		.catch((fehler) => {
			res.status(500).send(fehler)
		})
}

//post:
exports.erstelleaufgabe = (req, res, next) => {
	const nutzer = req.body;
	const errors = validationResult(req)

	if (!errors.isEmpty()) {

		return res.status(422).json({
			fehlerBeiValidierung: errors.array()
		})
	}
	TodoApp.create(nutzer).then(
		(ergebnis) => {
			res.status(201).send(ergebnis);
		}
	).catch(
		(fehler) => {
			res.status(500).send(fehler);
		}
	)
}
	//get mit id
	exports.Datenholenmitid = (req, res, next) => {
		const { _id } = req.params;

		TodoApp.findOne({ _id }).then(
			(ergebnis) => {
				res.status(200).send(ergebnis);
			}
		)
			.catch(
				(fehler) => {
					res.status(500).send({ message: "Fehler bei GET:/_id", objekt: fehler });
				}
			)
	}

