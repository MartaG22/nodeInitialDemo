// Nivell 3 - Exercici 1

const fetch = require("cross-fetch");

const pokemon = async (req, res) => {
    try {
        const id = await req.params.id;
        if (isNaN(id)) {

            res.status(400).json({ error: "S'ha d'introduir un nombre" });

          } else {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

            const pokemonTrobat = await fetch(url);

            console.log("pokemonTrobat", pokemonTrobat);

            if (pokemonTrobat) {
              const pokemon = await pokemonTrobat.json();

              const dadesPokemon = {
                  "ID Pokemon": id,
                  "nom Pokemon": pokemon.name,
                  "alçada Pokemon": pokemon.height,
                  "pes Pokemon": pokemon.weight,
              };
              console.log(dadesPokemon);
              res.status(200).send(dadesPokemon);
              
            }

          }
    } catch (error) {
        return res.status(400).json({ error: "BAD REQUEST >> No existeix aquest POKEMON!" });
    }
};


module.exports = pokemon;
