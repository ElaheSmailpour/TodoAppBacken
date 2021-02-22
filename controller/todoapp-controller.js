

const TodoApp = require("../models/todoappmodel")
//get

exports.Datenholen=(req,res,next)=>{
	TodoApp.find().then((ergebnis)=>{
		res.status(200).send(ergebnis)
	}).catch((fehler)=>{
		res.status(500).send(fehler)
	})
}

//post:
exports.erstelleaufgabe=(req,res,next)=>{
	const nutzer = req.body;

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

/*
// für GET 
exports.aufgabeholen = (req, res, next) => {

	TodoApp.find().then((ergebnis) => {
		res.status(200).send(ergebnis)
	}).catch(
		(fehler) => {
			res.status(500).send(fehler);
		}
	);
}

//get mit id
exports.holeaufgbemitid=(req,res,next)=>{
	const { _id } = req.params;

	TodoApp.findOne({ _id }).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch(
		(fehler) => {
			res.status(500).send({ message: "Fehler bei GET:/_id", objekt: fehler});
		}
	)
}

//put mit id
exports.aktualisiere = (req, res, next) => {
	const { _id } = req.params;
	const nutzerDaten = req.body;

	TodoApp.findOneAndUpdate({_id}, nutzerDaten, {new: true, upsert: true}).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch(
		(fehler) => {
			res.status(500).send({ message: "Fehler bei PUT /users/_id ", objekt: fehler})
		}
	)
}
//löschen mit id
exports.löschen = (req, res, next) => {
	const { _id } = req.params;

	TodoApp.deleteOne( { _id }).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch(
		(fehler) => {
			res.status(500).send({ message: "Fehler bei DELETE /users/_id", objekt: fehler})
		}
	)
}
*/