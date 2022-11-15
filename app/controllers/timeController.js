
const time = (req, res) => {
    try {
        console.log("nom:", req.body.nom);

        const usuariCorrecte = "Omar";
        const nomUsuari = req.body.nom;
        console.log("nomusuari", nomUsuari);

        if (usuariCorrecte === nomUsuari) {
            let dataActual = new Date;
            res.set('Cache-control', 'no cache').json({
                suceso: true,
                missatge: "Usuari correcte!",
                usuari: nomUsuari,
                data: `${dataActual.getDate()}/${dataActual.getMonth() + 1}/${dataActual.getFullYear()}`,
                hora: `${dataActual.getHours()}:${String(dataActual.getMinutes()).padStart(2, '0')}`
            });
            return res.send.json;

        } else {
            res.status(400).json({
                suceso: false,
                missatge: "Usuari incorrecte"
            })
        };
    } catch (error) {
        return res.status(401).json({ error: error.message });

    };
};

module.exports = time;