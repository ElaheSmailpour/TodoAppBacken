
const { validationResult } = require('express-validator')
const TodoAufgabe = require("../models/todoappmodel")

//get
exports.Datenholen = (req, res, next) => {
	
	TodoAufgabe.find({userId:req.tokenNutzer.userId}).then((ergebnis) => {
		res.status(200).send(ergebnis)
	})
		.catch((fehler) => {
			res.status(500).send(fehler)
		})
}

//erledigt : welche nutzer ist gerade eingeloggt und welche aufgabe die nutzer hat erledigt
exports.erledigt = async (req, res, next) => {
	try {
		let erledigteaufgabe = await TodoAufgabe.find({userId: req.tokenNutzer.userId,erledigt:true})
		console.log("erledigteaufgabe=",erledigteaufgabe)
	
		if (erledigteaufgabe === null) {
			return res.status(401).send('Du kannst nicht einloggen werden!')
		}
		res.status(200).send(erledigteaufgabe)
	
	}
	 catch (error) {
		res.status(401).send('bei erledigte Aufgabe etwas schief gelaufen!')
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
	TodoAufgabe.create(aufgabe).then(
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
	
	TodoAufgabe.findOne({ _id }).then(
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

exports.markierteaufgabe = (req, res, next) => {
	const { _id } = req.params;
	const nutzerDaten = req.body
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			fehlerBeiValidierung: errors.array()
		})
	}
	
	TodoAufgabe.findOneAndUpdate({ _id }, {erledigt:true})
	.then(
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
	TodoAufgabe.deleteOne({_id}).then(
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


