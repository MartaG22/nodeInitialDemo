# Entrega 4.1: Node REST Server
---
## 💬 Descripció:
S'implementa una API per consumir els endpoints de l'entrega.
 - **Express** -> for building REST APIs,


## 💻 Requeriments:
S'han d'instal·lar les següents tecnologies:

- [Node.js](https://nodejs.org/en/download/) 
- [NPM](https://www.npmjs.com/) 


##  Per començar!!!  
### 🛠️ Instal·lar:

> **Step 1** - Clonar el projecte:
```

https://github.com/MartaG22/nodeInitialDemo/tree/API-REST
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