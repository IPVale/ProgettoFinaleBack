Esercizio: Creazione di un'API per un E-commerce utilizzando Node.js, Express, Prisma, JWT, Cookies e Sessioni con Gestione dei Ruoli
 
 
 Obiettivo:
 Realizzare un'API completa per un'applicazione di E-commerce che gestisca la
 registrazione degli utenti,
l'autenticazione,
la gestione del carrello degli acquisti,
la visualizzazione dei prodotti e 
la gestione degli ordini. Inoltre,




aggiungere la gestione dei ruoli per consentire agli
 amministratori di eseguire operazioni privilegiate come la gestione dei prodotti e degli ordini,
 mentre agli editor verranno assegnate operazioni più limitate.





 Creare un server Node.js utilizzando Express.
 Utilizzare Prisma come ORM per la gestione del database.
 Implementare l'autenticazione JWT per consentire agli utenti di accedere in modo sicuro
 all'API.
 Utilizzare cookies e sessioni per gestire lo stato dell'utente e mantenere la sessione attiva.
 Creare endpoint per la registrazione e l'accesso degli utenti.
 Implementare le operazioni CRUD (Create, Read, Update, Delete) per i prodotti.
 Consentire agli utenti autenticati di aggiungere prodotti al carrello degli acquisti e di
 effettuare ordini.
 Implementare un sistema di autorizzazione basato sui ruoli per limitare l'accesso a
 determinati endpoint solo agli utenti autorizzati.
 Assegnare ruoli agli utenti (amministratore, editor) e garantire che solo gli utenti con i ruoli
 appropriati possano accedere alle risorse e alle operazioni corrispondenti.
 Documentare chiaramente l'API, inclusi i ruoli degli utenti e le autorizzazioni.
 Suggerimenti:
 Dividere il progetto in moduli separati per una migliore organizzazione del codice.
 Utilizzare middleware per gestire l'autenticazione, l'autorizzazione e la gestione degli errori.