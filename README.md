# Challenge Arena 

## Installation
npm install

## Lancer le serveur
node server.js

## Routes

### Participants
GET /participants

### Challenges
GET /challenges  
POST /challenges  
POST /challenges/:id/validate

## Fonctionnement
- Un participant peut valider un challenge
- Les points du challenge sont ajoutés au score du participant