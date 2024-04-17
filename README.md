# Project Work finale

**Progetto di realizzazione di un e-commerce in Node.js**

realizzato da: [Matteo Fasolino](https://github.com/hantermatty) e [Valeria Imbrogio Ponaro](https://github.com/IPVale)

## Tecnologie utilizzate
`Javascript `, `Typescript `, `Prisma ORM`, `Express.js `, `MySQL`

## Funzionalita' implementate
### UTENTI
Registrazione e autenticazione dell'utente e/o admin; viene assegnato un "role" per la gestione delle autorizzazioni
del profilo, per differenziare le abilità utente da quelle dell'amministratore.

L'utente potrà visualizzare modificare i propri dati di registrazione, visualizzare e inserire i prodotti
nel carrello ed effettuare modifiche in termini di tipo prodotto e quantità; potrà, inoltre, visualizzare e confermare un ordine.
L'admin può gestire tutta la parte delle modifiche all'interno dei moduli come ad esempio aggiungere i prodotti in
vendita.

### PRODOTTI
L'e-commerce è stato progettato per poter consentire di visualizzare, aggiungere, modificare, eliminare
un prodotto che verrà poi inserito nel carrello prima di procedere all'acquisto.

Come precedentemente accennato solo gli admin potranno effettuare modifiche dei prodotti presenti in archivio.

### CARRELLO
Gli utenti potranno gestire i loro prodotti prima di acquistarli, si può modificare la quantità d'acquisto
o eliminare il prodotto o tutti i prodotti inseriti.

Quando il carrello verrà inviato all'ordine in automatico si svuoterà.

### ORDINI
Le funzionalità presenti in questo modulo sono: creazione, ricerca prodotti, eliminazione di un ordine.

Quando gli utenti confermeranno il carrello verrà creato un ordine, ricerca dei prodotti all'interno dell'ordine effettuato
ed eliminare un ordine gia confermato