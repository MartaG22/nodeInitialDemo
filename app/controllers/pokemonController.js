// Nivell 3 - Exercici 1

const fetch = require('cross-fetch');   


const pokemon = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    const pokemonTrobat = await fetch(url);

    if (res.status >= 400) {
      throw new Error("Aquest POKEMON no està enregistrat!");
    }

    const pokemon = await pokemonTrobat.json();

    const dadesPokemon = { "ID Pokemon": id, "nom Pokemon": pokemon.name, "alçada Pokemon": pokemon.height, "pes Pokemon": pokemon.weight };
    console.log(dadesPokemon);
    res.status(200).send(dadesPokemon);

  } catch (error) {
    return res.status(400).json({ error });

  };
};

module.exports = pokemon;