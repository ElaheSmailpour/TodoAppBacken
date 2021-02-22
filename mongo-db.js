/** Mongoose Modul importieren  */
const mongoose = require("mongoose");

/** Simpler Adressstring: Protokoll ://  Host : Port / Datenbank  */
let addressString = process.env.mongo || "mongodb+srv://dci:dci2021@dci-store-cluster.ttbnh.mongodb.net/elahe";
let optionen = { useNewUrlParser: true, useUnifiedTopology: true };

const verbindeDB = () => {

    /** Verbindung für das Mongoose Modul herstellen mit Connect */
    mongoose.connect(addressString, optionen).then( (mongooseModul) => {
        console.log("Bin mit der Datenbank verbunden");
        //console.log("Bin mit der Datenbank verbunden", mongooseModul);

    } ).catch( (fehler) => {
        console.error("Fehler mit MongoDB: "+fehler);
    } );

}

module.exports = verbindeDB;