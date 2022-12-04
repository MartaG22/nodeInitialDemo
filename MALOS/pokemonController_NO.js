// Nivell 3 - Exercici 1

const fetch = require("cross-fetch");
/*
const pokemon = async (req, res) => {
  try {
    // const id = req.params.id;
    const id = await req.params.id;

    if (isNaN(id)) {
      //? AQUEST VALIDACIÓ DE EST+À BÉ, FUNCIONAAAA"""
      Error = "S'ha d'introduir un nombre";
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    const pokemonTrobat = await fetch(url);

    console.log("pokemonTrobat", pokemonTrobat);
    if (!pokemonTrobat) {
      // if (res.status >= 400) {
      Error = "No existeix aquest POKEMON!";  //? Error 404
    } else {
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
  } catch (Error) {
    return res.status(400).send({ Error });
  }
};
*/



//!   VICTOR:
 const pokemon = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ error: "Only numbers allowed" });
  }
  const api = fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then((res) => {
      if (api.status >= 400) {
        throw new Error("400: Bad response from server");
      }
      return res.json();
    })
    .then((data) => {
      if (data.name !== "FetchError") {
        res.json({
          name: data.name,
          height: data.height,
          weight: data.weight,
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        status: "error",
        message: "The id entered does not correspond to any pokemon",
      });
    });
};
 





/* const pokemon = async (req, res) => {
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
}; */

module.exports = pokemon;
