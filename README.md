# Webtech3
A simple memory game that is made with HTML, CSS and Javascript.

No framework is used for this project as of yet,
everything you can see here right now is written from scratch.

## Info
All the work done is with the requirements in mind of this link:
`https://hanze-hbo-ict.github.io/webtech3/index.html`

Before this server is running, the backend needs to be set up.
Make sure the backend is running on `localhost:8000`

To start the server:
```
cd .../Webtech3/src
php -S localhost:9000
```
Then navigate to `localhost:9000/html/index.html`.
It is *vital* to run this app on `port 9000`. All the requests and redirects are sent to this port.

------------------ To-do list ------------------
- Zorg ervoor dat de top vijf (of hoeveel je maar laat zien) die je bij het memory-spel laat zien daarwerkelijk de top vijf is die op de backend geregisteerd is.
- Sla het JWT op in de localStorage en zorg ervoor dat dit bij elke request naar de backend in de header wordt meegestuurd. (Moet nog meegestuurd worden met elke header)
- Maak een nieuwe pagina waarop de speler zijn of haar voorkeuren kan opgeven. Deze voorkeuren bestaan uit de favoriete plaatjes-API, de kleur voor gevonden kaartjes en de kleur voor gesloten kaarten.
- Het moet voor de speler ook mogelijk zijn het opgegeven e-mailadres te wijzigen. Dat kun je op dezelfde pagina doen als waar de voorkeuren worden bijgehouden, of je kunt hier weer een nieuwe pagina voor maken.
- Als de TTL van het JWT verlopen is, moet de speler een melding krijgen en naar de loginpagina verwezen worden.
