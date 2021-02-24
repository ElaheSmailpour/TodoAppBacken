
const { validationResult } = require('express-validator')
const TodoApp = require("../models/todoappmodel")

//get
exports.Datenholen = (req, res, next) => {
	
	TodoApp.find({userId:req.tokenNutzer.userId}).then((ergebnis) => {
		res.status(200).send(ergebnis)
	})
		.catch((fehler) => {
			res.status(500).send(fehler)
		})
}
//erledigt welche nutzer ist gerade eingeloggt und welche aufgabe die nutzer hat erledigt
exports.erledigt = async (req, res, next) => {
	
	const {_id}=req.tokenNutzer.userId;
	
	console.log("bin im fuktion-erledigt=")
	try {

	
		let eingelogghtenutzer = await TodoApp.findOne({id: req.tokenNutzer.userId},{erledigt:aufgabe.erledigt})
		console.log(eingelogghtenutzer);
	
		if (eingelogghtenutzer === null) {
			return res.status(401).send('Du bist nicht eingeloggte nutzer!')
		}
	} catch (error) {
		res.status(401).send('Du konntest nicht eingeloggt werden')
	}
}


//post:
exports.erstelleaufgabe = (req, res, next) => {
	const aufgabe = req.body;
	aufgabe.userId=req.tokenNutzer.userId
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
console.log(errors.array())
		return res.status(422).json({
			fehlerBeiValidierung: errors.array()
		})
	}
	TodoApp.create(aufgabe).then(
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



//put 

exports.update = (req, res, next) => {
	const { _id } = req.params;
	const nutzerDaten = req.body
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			fehlerBeiValidierung: errors.array()
		})
	}
	TodoApp.findOneAndUpdate({ _id }, nutzerDaten, { new: true, upsert: true }).then(
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
exports.Aufgabelöschen=(req,res,next)=>{
	const {_id}=req.params
	TodoApp.deleteOne({_id}).then(
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


