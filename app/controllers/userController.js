// Nivell 1 - Exercici 1

const user = (req, res) => {
    try {
        res.send({ nomUsuari: `Marta Garijo`, edat: 48, url: 'http://localhost:3000/user' })
    } catch (error) {
        return res.status(400).json({ error });
    };
};

module.exports = user;