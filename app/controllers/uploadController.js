const uploadFile = (req, res) => {
    try {
        console.log(req.file)
        if (req.fileValidationError) {
            console.log("Error: " + req.fileValidationError);
            // console.log("No s'ha pujat cap arxiu!");
            return res.status(400).json({ error: req.fileValidationError });

        } else if (!req.file) {
            console.log("No s'ha pujat cap arxiu!");
            return res.status(400).json({ error: "No s'ha pujat cap arxiu!" });

        } else {
            // console.log(req.file);
            // console.log(path.extname(req.file.originalname));
            return res.status(200).send({ success: `L'arxiu s'ha carregat correctament: ${req.file.originalname}` });
        };
    } catch (error) {
        return res.status(400).json({ error });

    };
};

module.exports = uploadFile;