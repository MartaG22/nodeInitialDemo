// Ben fet, Marta! Un parell de coses abans de provar-ho tot:

// TODO [x]  Veig que tens el .env però no l'estas usant, tens les credencials de la base de dades hardcodejades al document dbJoc.js. Com al README.md no em dius que les he de canviar ni on fer-ho, em dona un error de base de dades no autoritzada (però per alguna raó el server segueix corrent, així que suposo que el missatge CONEXIÓN A LA BASE DE DATOS OK és mentida i està on no toca 🙊)
// Tens el projecte una mica liat i es pot arreglar de dues maneres:
// TODO []  El package.json fora de la carpeta app, a la carpeta "base" de cadascun dels projectes (MySQL i Mongo) des d'on es farà npm i i npm start i un .env-template per cada carpeta amb les coses que calguin
// TODO [X]  El package.json fora de les carpetes MySQL i Mongo, amb uns scripts npm run mysql i npm run mongo per executar cadascun dels nivells i un .env-template amb tota la informació (que és el .env que tens ara)
// Mira de posar una mica d'ordre en això i m'ho torno a mirar 😉


//! NIVELL 3
// TODO []  Afegeix un endpoint /login que permeti accedir a un administrador
// amb usuari/ària i contrasenya i retorni un token i fes obligatòria 
// l'autentificació per JWT en tots els accessos als URL del microservei,
// fent servir middlewares per validar al token.



//!  2ª ENTREGA:
// Molt ben fet, Marta! Ara he aconseguit provar-ho tot:

// - El .env hauria d'estar exclòs del repo (com a bona pràctica, perquè normalment contenen informació privada) 
// i li hauries de fer una copia de l'estil .env-template perquè l'usuari vegi què ha de posar. 
// I ojo, que el nom de la DB de Mongo segueix hardcoded, no l'agafa de l'arxiu ❗

// - Al arrencar amb MySQL no ha creat la base de dades, l'he hagut de reiniciar un parell de vegades perquè la creés 
// i li afegís les taules (un problema de sincronia al crear-la?)

// - Els endpoints funcionen, però tens moltes respostes que no són JSON. 
// Totes les respostes del servidor haurien de ser en format JSON 
// (és la cosa més important que heu de treure d'aquests exercicis) ❗

// - El /players retorna un body buit quan no hi ha jugadors encara. 
// Hauria de retornar un JSON dient que encara no hi ha jugadors ❗

// - Al /ranking/loser i /ranking/winner s'hauria de retornar més d'un usuari si n'hi ha empatats com a guanyadors o perdedors

// -vBona feina fent les versions de MySQL i Mongo. 
// Seria encara millor si compartissin codi i només tinguessin diferent la configuració de la base de dades 
// i els controladors que calguin (es pot fer un require() condicional al començar 
// en funció de quina configuració s'ha escollit al arrencar). 
// Així t'estalvies algunes coses com tenir dos cops la col·lecció de Postman, que no cal

// - S'han de corregir sobretot les coses marcades amb ❗ per acabar de completar l'exercici (està fet però acumula unes quantes males pràctiques importants). Dona-li canya aquestes vacances, que crec que en un parell de tardes ho enllesteixes 💪🏻