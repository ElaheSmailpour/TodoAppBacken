
const { validationResult } = require('express-validator')
const TodoApp = require("../models/usertodoapp")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
exports.erstelleaufgabe = async (req, res, next) => {
	try {
		const nutzer = req.body;
	
		const errors = validationResult(req)
	
		if (!errors.isEmpty()) {
		
			return res.status(422).json({
				fehlerBeiValidierung: errors.array()
			})
		}
	
		let schonVorhandenUser = await TodoApp.find({ email: nutzer.email })
		if (schonVorhandenUser.length >= 1) {
			return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
		}

		let passwortGehashed = await bcrypt.hash(nutzer.passwort, 10)
		let erstelleNutzer = await TodoApp.create({ ...nutzer, passwort: passwortGehashed })
		res.status(201).send(erstelleNutzer);

	} catch (fehler) {
		res.status(500).send('Da lief was schief!')
	}
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
    if (_id !== req.tokenNutzer.userId) {
        return res.status(401).send('Sie sind nicht nutzer und Sie dürfen nicht hier etwas ändern!')
    }
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


exports.nutzerEinloggen = async (req, res, next) => {
	let nutzer = req.body
	try {
	
		let userVonDatenbank = await TodoApp.findOne({ email: nutzer.email })
		console.log(userVonDatenbank);
	
		if (userVonDatenbank === null) {
			return res.status(401).send('Du konntest nicht eingeloggt werden')
		}

		let vergleichVonPasswort = await bcrypt.compare(nutzer.passwort, userVonDatenbank.passwort)
		
		if (vergleichVonPasswort) {

			let token = jwt.sign({
				email: userVonDatenbank.email,
				userId: userVonDatenbank._id,
			}, process.env.JWT || 'ein Geheimnis', {expiresIn: '3h'})
			res.status(200).json({
				nachricht: 'Du bist eingeloggt',
				token: token
			})
		} else {
			res.status(401).send('Du konntest nicht eingeloggt werden')
		}
	} catch (error) {
		res.status(401).send('Du konntest nicht eingeloggt werden')
	}
}

