# Entrega 4.1: Node REST Server
---
## 💬 Descripció:

Crearem una API REST de resposta ràpida.


## ⭐ Nivell 1:


**Exercici 1**

Crea un servidor amb **Express** que retorni a una petició GET a l'endpoint **/user** un json amb el teu nom, edat i l'URL des d'on es fa la petició.

**Exercici 2**

Afegeix un endpoint **/upload** per a pujar al servidor un arxiu de tipus *png, jpg o gif* amb una petició POST i que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.


## ⭐⭐ Nivell 2:

**Exercici 1**

Crea un endpoint **/time** que rebi per POST com a paràmetre un JSON amb el nom d'usuari/ària i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera *Cache-control: no-cache*. Habiliti CORS *(Cross-Origin Resource Sharing)* en les respostes, sigui mitjançant Express o mitjançant un altre middleware.

**Exercici 2**

Afegeix un middleware a l'endpoint anterior que retorni un HTTP Status *401 - Unauthorized* si la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).

## ⭐⭐⭐ Nivell 3:

**Exercici 1**

Crea una petició GET a l'endpoint **/pokemon/{id}** que rebi un número de Pokémon, faci una cerca al Pokémon API i retorni el nom del Pokémon, la seva alçada i el seu pes.

->Pokeapi

---

---
## 💬 Descripció:


## 💻 Requeriments:
S'implementa una API per consumir els endpoints de l'entrega.
 - **Express** -> for building REST APIs,
  
S'han d'instal·lar les següents tecnologies:

- [Node.js](https://nodejs.org/en/download/) 
- [NPM](https://www.npmjs.com/) 


##  Per començar!!!  
### 🛠️ Instal·lar:

> **Step 1** - Clonar el projecte:
```

https://github.com/MartaG22/nodeInitialDemo/tree/api-rest
```


> **Step 2** - Instal·lar les dependències necessàries:

```
npm install
```
> **Step 3** - Inicialitzar el server 
npm start

## ENDPOINTS:
 
- **GET/user** --- 
```

{
    "name": "Bart Simpson",
    "age": "10",
    "url": "http://localhost:3000/user"
}
```

- **POST/upload** --- 

 S'ha d'insertar una imatge. Les extensions permeses són .png, .jpg, .tif.
 Si la imatge introduida correspon amb aquestes extension es mostrarà un missatge d'èxit.
 En el cas de no afegir cap arxiu, ens mostrarà missatge dient que no s'ha afegit cap arxiu.
 En el cas d'afegir un arxiu que no es correspongui amb cap de les extensions permeses, ens mostrarà un missatge dient que no està permesa l'extensió introduïda.


- **POST/time** --- 

  Si les dades introduides es corresponen amb les que estan registrades, es mostrarà "Usuari correcte", en el cas contrari es mostrarà "Usuari incorrecte"
```
{
    "name": "Omar",
}
```


- **GET/pokemon/:id** --- 

Agafa les dades d'un pokemon pel seu ID a la web  ==>[Pokémon API](https://pokeapi.co/)  i ens retorna el nom, l'alçada i el pes corresponents.
 ```
    "pokemon": {
        "ID Pokemon": "41",
        "nom Pokemon": "zubat",
        "alçada Pokemon": 8,
        "pes Pokemon": 75
    }

```