const sequelize = require('sequelize');
// const  Joc = require('../../models/dbJoc_Mongoose.js');
const Jugador = require('../../models/dbJoc_Mongoose.js');
const Jugada = require('../../models/dbjugada.js');

// app.get('/ranking', 

const llistarRanking = async (req, res) => {
    // Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.

    let missatge = "";
    let sumaPercentatges = 0;
    try {
        const llistatJugadors = await Jugador.find({})
        // const llistat = JSON.stringify(llistatJugadors);
        // console.log("llistat:", llistat);
        console.log("sin ordenar:", llistatJugadors)
        // let rankingLlistatJugadors = llistatJugadors.reverse(llistatJugadors.sort((a, b) => a - b));
        // console.log("ordenada:", rankingLlistatJugadors)

        // const llistatOrdenat = 
        await Jugador.find().sort({
            percentatgeExit: -1
        }).then((llistatOrdenat) => {

            llistatOrdenat.forEach(jugador => {
                sumaPercentatges += jugador.percentatgeExit;
                // console.log(sumaPercentatges);

                missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit}% \n \n`
                // console.log(missatge);
            })
        });
        
        const quantitatJugadors = await Jugador.count({})
        const percentatgeMig = sumaPercentatges / quantitatJugadors;
        
        
        
        // Jugador.forEach(jugador => { 
            //     sumaPercentatges = sumaPercentatges + jugador.percentatgeExit;
            //     console.log(sumaPercentatges);
            // });
            
            
            
        console.log('quantitatJugadors', quantitatJugadors);
        console.log('SUMA percentatges:', sumaPercentatges);
        console.log('percentatgeMig', percentatgeMig);
        
        missatge += `PERCENTATGE D'ÈXIT MIG DE TOTS ELS JUGADORS: ${percentatgeMig}% `

        console.log(missatge);
        // console.log('totalRanking', totalRanking);
        // TODO modificar para entregar bien el missatge

        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };

};

module.exports = llistarRanking;
