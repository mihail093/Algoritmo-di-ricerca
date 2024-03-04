/*
PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file, NON modificarlo in alcun modo.
L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
    { title: "Marketing Intern", location: "US, NY, New York" },
    {
      title: "Customer Service - Cloud Video Production",
      location: "NZ, Auckland",
    },
    {
      title: "Commissioning Machinery Assistant (CMA)",
      location: "US, IA, Wever",
    },
    {
      title: "Account Executive - Washington DC",
      location: "US, DC, Washington",
    },
    { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
    { title: "Accounting Clerk", location: "US, MD," },
    { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
    {
      title: "Lead Guest Service Specialist",
      location: "US, CA, San Francisco",
    },
    { title: "HP BSM SME", location: "US, FL, Pensacola" },
    {
      title: "Customer Service Associate - Part Time",
      location: "US, AZ, Phoenix",
    },
    {
      title: "ASP.net Developer Job opportunity at United States,New Jersey",
      location: "US, NJ, Jersey City",
    },
    {
      title: "Talent Sourcer (6 months fixed-term contract)",
      location: "GB, LND, London",
    },
    {
      title: "Applications Developer, Digital",
      location: "US, CT, Stamford",
    },
    { title: "Installers", location: "US, FL, Orlando" },
    { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
    {
      title: "VP of Sales - Vault Dragon",
      location: "SG, 01, Singapore",
    },
    { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
    {
      title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
      location: "GB, SOS, Southend-on-Sea",
    },
    { title: "Visual Designer", location: "US, NY, New York" },
    {
      title: "Process Controls Engineer - DCS PLC MS Office - PA",
      location: "US, PA, USA Northeast",
    },
    { title: "Marketing Assistant", location: "US, TX, Austin" },
    { title: "Front End Developer", location: "NZ, N, Auckland" },
    { title: "Engagement Manager", location: "AE," },
    {
      title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
      location: "US, CA, Carlsbad",
    },
    { title: "Customer Service", location: "GB, LND, London" },
    { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
    { title: "Marketing Exec", location: "SG," },
    {
      title: "HAAD/DHA Licensed Doctors Opening in UAE",
      location: "AE, AZ, Abudhabi",
    },
    {
      title: "Talent Management Process Manager",
      location: "US, MO, St. Louis",
    },
    { title: "Customer Service Associate", location: "CA, ON, Toronto" },
    {
      title: "Customer Service Technical Specialist",
      location: "US, MA, Waltham",
    },
    { title: "Software Applications Specialist", location: "US, KS," },
    { title: "Craftsman Associate", location: "US, WA, Everett" },
    { title: "Completion Engineer", location: "US, CA, San Ramon" },
    { title: "I Want To Work At Karmarama", location: "GB, LND," },
    {
      title: "English Teacher Abroad",
      location: "US, NY, Saint Bonaventure",
    },
]

// SVOLGO L'ESERCIZIO
// Le prime due costanti sono i due input di tipo testo
const occupation = document.getElementById("title");
const geographicPosition = document.getElementById("location");

// La costante button serve per richiamare l'input di tipo 'button'
const button = document.getElementById("button");

// tbody con id "tableBody" mi serve per inserire i risultati della ricerca
const tableBody = document.getElementById("tableBody");

// Il div con id "divVuoto" qui inserirò la scritta "RISULTATI TROVATI"/"NESSUN RISULTATO TROVATO"
const divVuoto = document.getElementById("divVuoto");

// Richiamo gli elementi con classe "tableText" in modo da rimuovere o usare 'toggle' sulla classe "tableDisplayNone"
const tableText = document.getElementsByClassName("tableText");
// Richiamo il <td> dove inserirò il conteggio dei risultati
const tdCounter = document.getElementById("tdCounter");

function search(job, loc) {
    // Creo la variabile outcome
    let outcome = { result: [], count: 0 };
    /*
    Creo un ciclo per l'array jobs; il ciclo crea degli array titoloParole e degli array localitaParole
    per ogniuno degli elementi contenuti in jobs.
    Gli array creati conterranno strighe in minuscolo come elementi.
    - SE titoloParole contiene la stringa che andrò a scrivere come parametro job e
    localitaParole contiene la stringa che andrò a scrivere come parametro loc 
    - ALLORA aggiungi a outcome.result il "title" e "location" presenti all'interno di jobs.
    Uso .toLowerCase() per evitare che la ricerca sia case sensitive.
    */
    for (let lavoro of jobs) {
        let titoloParole = lavoro.title.toLowerCase();
        let localitaParole = lavoro.location.toLowerCase();
        if (titoloParole.includes(job.toLowerCase()) && localitaParole.includes(loc.toLowerCase())) {
        outcome.result.push({ title: lavoro.title, location: lavoro.location });
        }
    }
    // Imposto il conteggio dei risultati
    outcome.count = outcome.result.length;
  
    return outcome;
}

// Aggiungo .addEventListener al bottone
button.addEventListener("click", function () {
    const occupationText = occupation.value;
    const geographicPositionText = geographicPosition.value;
    const searchResult = search(occupationText, geographicPositionText);
    
    // Pulisco la tabella prima di inserire nuovi dati
    tableBody.innerHTML = "";
    tdCounter.innerHTML = "";
    
    // Se ci sono risultati, li aggiunge alla tabella
    if (searchResult.result.length > 0) {
        // Se è presente un elemento figlio di divVuoto inserito da una ricerca precedente allora lo rimuove
        while (divVuoto.firstChild) {
            divVuoto.removeChild(divVuoto.firstChild);
        }
        for (let i = 0; i < tableText.length; i++) {
          tableText[i].classList.remove("tableDisplayNone");
        }
        tdCounter.textContent = searchResult.result.length;
        let nuovoTitolo = document.createElement("h4");
        nuovoTitolo.textContent = "RISULTATI TROVATI:";
        divVuoto.appendChild(nuovoTitolo);
        searchResult.result.forEach((item) => {
            let nuovoTr = document.createElement("tr");
            let nuovoTd = document.createElement("td");
            let nuovoTd2 = document.createElement("td");
            nuovoTd.textContent = item.title;
            nuovoTd2.textContent = item.location;
            nuovoTr.appendChild(nuovoTd);
            nuovoTr.appendChild(nuovoTd2);
            tableBody.appendChild(nuovoTr);
        });
    }
    else {
        // Se non ci sono risultati, mostra un messaggio ed esegue un ciclo per rimuovere la classe "tableDisplayNone"
        divVuoto.textContent = "NESSUN RISULTATO TROVATO";
        for (let i = 0; i < tableText.length; i++) {
          tableText[i].classList.toggle("tableDisplayNone");
        }
    }
    // Resetta i valori degli input
    occupation.value = "";
    geographicPosition.value = "";
});

// Infine aggiungo .addEventListener a window per fare in modo di effettuare la ricerca anche premendo 'Enter'
window.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        button.click();
    }
});