// const newPage = require("../HTML/xat.html");
// const fetch = require('cross-fetch');

// const { response } = require("express");


document.querySelector(".entry-form").addEventListener("submit", (e) => {
    e.preventDefault();

    sessionStorage.clear();
    //     let userName = document.getElementById("usuario").value;
    //     let password = document.getElementById("pass").value;
    const userName = document.querySelector('.entry-form [name="usuario"]').value;
    const password = document.querySelector('.entry-form [name="pass"]').value;

    console.log("userName:", userName, "password:", password);
    const apiURL = "http://localhost:3000"; // Conectem amb el SERVER

    if (!userName && !password) {
        console.log("NO HAS INTRODUCIDO DATOS"); 
        return;
    };
    if (!userName){
        console.log('NO HAS INTRODUCIDO NOMBRE');
        return;
    };
    if (!password) {
        console.log("NO HAS INTRODUCIDO CONSTRASEÑA");
        return;
    };
    
    // window.location.replace('../HTML/xat.html')



    //! NO FUNCIONA BIEN EL FETCH
    // fetch('http://localhost:3000/register', {
    fetch(apiURL + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify ({userName, password})
    })
    .then(response => { response.json()})
        // window.location.replace('../HTML/xat.html');  //! LA VENTANTA TENDRÍA QUE LLAMARSE AQUÍ
    //  res.json()})
    .then(data => {
            console.log('Success:', data)
            window.location.replace('../HTML/xat.html')  //! LA VENTANTA TENDRÍA QUE LLAMARSE AQUÍ
        // if (json.status === 'ok') {
        //     // require('../HTML/')
        //     window.location.replace('../HTML/xat.html')  //! LA VENTANTA TENDRÍA QUE LLAMARSE AQUÍ
        // } else {
        //     registerError.innerHTML = data.message;
        // }
    }).catch(console.error('Error: ', error.message)); 
    // => registerError.innerHTML = err.message);



});
