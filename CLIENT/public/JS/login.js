// https://www.youtube.com/watch?v=C8xJyQGe6RA
// https://lenguajejs.com/javascript/eventos/addeventlistener/      //! ADDEVENTLISTENER
// https://www.youtube.com/watch?v=l8QD6BE24FU
// document.querySelector('form').addEventListener("submit", (e) => {
//     e.preventDefault();
document.getElementById("btnLogin").addEventListener("submit", )
    function login() {
        let user = document.getElementById("usuario").value;
        let pass = document.getElementById("pass").value;
        console.log(user, pass);
        const apiURL = 'http://localhost:3000';  // Conectem amb el SERVER
        // alert(`Validando función + ${user} + ${pass}`);


        fetch (apiURL + '/login', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, pass }),
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // let usuario = "Marta";

            // let password = "1234";
            // if(user == usuario && pass == password) {
            //     alert ("Bienvenido al sistema: " + usuario);
            //     // require('../HTML/xat.html')
            //     window.location.assign('../HTML/xat.html');
            //             // ENVIAR DATOS  VALIDADOS  INTRODUCIDOS AL BACK
        
            // } else if (user == "" || pass == "") {
            //     alert ("Por favor, introduce los datos requeridos");
            // } else {
            //     alert ("Usuario y/o contraseña no válidos");
            // }
        }).catch(error => 
            console.log(error.message))
            // document.getElementById('login-error').innerHTML = error.message);
    
    
    };
