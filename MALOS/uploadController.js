// Nivell 1 - Exercici 2
// TODO •	El /upload està quasi bé, però falla al pujar un arxiu perquè no comprova si hi ha la carpeta on puja els arxius per crear-la si no existeix (has d'afegir la comprovació perquè git no puja carpetes buides)

const uploadFile = (req, res) => {
    try {
        console.log(req.file)
        if (req.fileValidationError) {
            console.log("Error: " + req.fileValidationError);
            return res.status(400).json({ error: req.fileValidationError });

        } else if (!req.file) {
            console.log("No s'ha pujat cap arxiu!");
            return res.status(400).json({ error: "No s'ha pujat cap arxiu!" });

        } else {
            return res.status(200).send({ success: `L'arxiu s'ha carregat correctament: ${req.file.originalname}` });
        };
    } catch (error) {
        return res.status(400).json({ error });

    };
};

module.exports = uploadFile;