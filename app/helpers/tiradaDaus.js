let resultatJugada = false;
let tirades = 0;


const tiradaDaus = function tiroDaus() {
    let tiradaDau1 = parseInt(Math.random() * 6 + 1);
    let tiradaDau2 = parseInt(Math.random() * 6 + 1);
    console.log("DAU 1:", tiradaDau1);
    console.log("DAU 2:", tiradaDau2);
    // let resultat = false;

    ++tirades;
    let sumaDados = tiradaDau1 + tiradaDau2;
    console.log(sumaDados);
    if (sumaDados == 7) {
        resultatJugada = true;
    } else {
        resultatJugada = false;
    }
    console.log(tiradaDau1, tiradaDau2, resultatJugada);
    return ({ tiradaDau1, tiradaDau2, resultatJugada });
    // console.log(nombre)
    console.log(tirades);
};

module.exports = tiradaDaus;