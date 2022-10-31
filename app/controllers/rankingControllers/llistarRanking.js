const {dbJugadors, dbJugades} = require('../../models/dbJoc');

// app.get('/ranking', 

const llistarRanking = async (req, res) => {
    // Retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.

    let missatge = "";
    try {
        const llistatJugadors = await dbJugadors.findAll({})
        // const llistat = JSON.stringify(llistatJugadors);
        // console.log("llistat:", llistat);
        console.log("sin ordenar:", llistatJugadors)
        let rankingLlistatJugadors = llistatJugadors.reverse(llistatJugadors.sort((a, b) => a - b));
        console.log("ordenada:", rankingLlistatJugadors)
        rankingLlistatJugadors.forEach(jugador => {
            missatge += `ID Jugador: ${jugador.idJugador} \nNom Jugador: ${jugador.nomJugador} \nPercentatge d'èxit: ${jugador.percentatgeExit}% \n \n`
            console.log(missatge);
        });

        const quantitatJugadors = await dbJugadors.count({})
        const totalRanking = await dbJugadors.sum('percentatgeExit');
        const percentatgeMig = totalRanking / quantitatJugadors;


        console.log('quantitatJugadors', quantitatJugadors);
        console.log('totalRanking', totalRanking);
        console.log('sfafsa percentatgeMig', percentatgeMig);

        missatge += `PERCENTATGE D'ÈXIT MIG DE TOTS ELS JUGADORS: ${percentatgeMig}%`

        res.status(200).send(missatge);
    } catch (error) {
        res.status(400).send(error);
    };

};

module.exports = llistarRanking;
