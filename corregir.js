// Ben fet, Marta! Un parell de coses abans de provar-ho tot:

// Veig que tens el .env però no l'estas usant, tens les credencials de la base de dades hardcodejades al document dbJoc.js. Com al README.md no em dius que les he de canviar ni on fer-ho, em dona un error de base de dades no autoritzada (però per alguna raó el server segueix corrent, així que suposo que el missatge CONEXIÓN A LA BASE DE DATOS OK és mentida i està on no toca 🙊)
// Tens el projecte una mica liat i es pot arreglar de dues maneres:
// El package.json fora de la carpeta app, a la carpeta "base" de cadascun dels projectes (MySQL i Mongo) des d'on es farà npm i i npm start i un .env-template per cada carpeta amb les coses que calguin
// El package.json fora de les carpetes MySQL i Mongo, amb uns scripts npm run mysql i npm run mongo per executar cadascun dels nivells i un .env-template amb tota la informació (que és el .env que tens ara)
// Mira de posar una mica d'ordre en això i m'ho torno a mirar 😉