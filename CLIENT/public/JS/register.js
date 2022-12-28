// https://www.youtube.com/watch?v=C8xJyQGe6RA
// https://lenguajejs.com/javascript/eventos/addeventlistener/      //! ADDEVENTLISTENER
// https://www.youtube.com/watch?v=l8QD6BE24FU
// document.querySelector('form').addEventListener("submit", (e) => {
//     e.preventDefault();
// document.getElementById("btnLogin").addEventListener("submit", )

function register() {
    let userName = document.getElementById("usuario").value;
    let password = document.getElementById("pass").value;
    console.log("userName:", userName, "password:", password);
    const apiURL = "http://localhost:3000"; // Conectem amb el SERVER
    // alert(`Validando función + ${userName} + ${pass}`);
    // window.location.replace("../HTML/xat.html");

    if (!userName) {
        console.log("NO HAS INTRODUCIDO NOMBRE");
    }
    if (!password) {
        console.log("NO HAS INTRODUCIDO CONSTRASEÑA");
    }
    if (userName && password) {
        fetch(apiURL + "/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "ok") {
                    // console.log(data);
                    console.log("EXITO!!!");
                    // require("../HTML/xat");
                    window.location.replace("../HTML/xat.html");

                    // console.log("Bienvenido al sistema: " + usuarioDB);
                } else {
                    // console.log(data);

                    console.log("ERROR");
                    // let usuarioDB = "Marta";
                    // let passwordDB = "1234";

                    // if (userName == usuarioDB && password == passwordDB) {
                    // if (userName == 'Marta' && password == 1234) {
                    //     // require('../HTML/xat.html')
                    //     require("../HTML/xat");
                    //     console.log("Bienvenido al sistema: " + usuarioDB);
                    //     window.location.replace("../HTML/xat.html");
                    // ENVIAR DATOS  VALIDADOS  INTRODUCIDOS AL BACK

                    // } else if (userName == "" || password == "") {
                    //     console.log ("Por favor, introduce los datos requeridos");
                    // } else {
                    //     console.log ("Usuario y/o contraseña no válidos");
                }
            })
            .catch((error) => console.log(error.message));
        // document.getElementById('login-error').innerHTML = error.message);
    }
}

// fetch(request)
// .then(response => {
//     if (!response.ok) throw Error(response.status);

//     return response;
// })
// .then(response => console.log("ok"))
// .catch(error => console.log(error));
// //en catch decidimos que hacer con el error, aquí recibimos response.status
