# TP_Node 

API REST construite avec Node.js et Express pour gérer des participants et leur classement.


1.Installation

Dans le terminale 
- git clone <url-du-repo>
- cd Tp_node
- npm install 


2. Lancer le projet

dans le terminale 
- mode développement (nodemon)
- npm run dev

Le serveur tourne sur "http://localhost:3000"



3. Structure du projet

Tp_node/
-----data/
   ---participants.json       # Base de données JSON
-----src/
  ---controllers/
        --controllersparticipants.js   # Logique métier participants
        --controllersclassement.js     # Logique métier classement
  ---routes/
        --routesparticipants.js        # Routes participants
        --routesclassement.js          # Routes classement
-----server.js                   # Point d'entrée
-----package-lock.json          
-----package.json
-----README.md




4. Routes disponibles

 Participants

 Méthode - Route - Description 

 GET - "/participants" :Récupérer tous les participants 
 GET - "/participants/:id" : Récupérer un participant par son ID 
 POST - "/participants" : Créer un nouveau participant 
 PUT - "/participants/:id" :  Modifier un participant
 DELETE - "/participants/:id" : Supprimer un participant

### Classement

Méthode  Route - Description 

 GET - "/classement" : Récupérer le classement décroissant par score 

. Exemples de requêtes

- Créer un participant

POST /participants
Content-Type: application/json

{
    "name": "Bernadette",
    "email": "bernadette@example.com"
}


- Modifier un participant

PUT /participants/1
{
    "name": "Bernadette Djouboune",
    "score": 1500
}

Format des données

json
[
  {
    "id"1,
    "name":"bernadette djouboune",
    "email":"bernadette@example.com,
    "score":1200
  }
]

- Technologies utilisées
- Node.js
- Express
- Nodemon rechargement automatique en développement
- fs/promises — lecture/écriture du fichier JSON
