/* Een functie aanmaken om een willekeurig getal te genereren. */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/* De lijst met inspirerende quotes. */
let lijst;
/* De willekeurige index die ingezet wordt. */
let index;
/* De lijst met inspirerende quotes ophalen. */
fetch('../json/lijst_met_quotes.json')
    /* Als de inhoud gevonden is, dan het zichtbaar maken voor de onderstaande functie "lijst". */
    .then(response => response.json())
    /* De procedure kan voortgezet worden. */
    .then(lijst => {
        /* De lijst bevat nu de inhoud van "lijst_met_quotes.json" */
        index = randomInt(0, lijst.length);
        /* Laten zien hoe de lijst uitziet. */
        /* console.log(lijst); */
        /* Hieronder worden twee functies opgesteld. */
        let getRandomQuote = () => {
            return lijst[index].tekst;
        };
        let getQuote = (optie) => {
            /* {auteur: true} is standaard ingesteld. Om de auteur te verbergen, moet de optie ingesteld worden op { auteur: false } */
            !optie && (optie = {auteur: true});
            return {
                tekst: lijst[index].tekst,
                ...(optie && optie.auteur ? {auteur: lijst[index].van} : {})
            };
        };
        /* Laten zien welke mogelijkheden er zijn om de quote te kunnen aanroepen vanuit JSON-script "lijst_met_quotes". */
        /* Een quote inladen met tekst en auteur. */
        /* console.log(getQuote()); */
        /* Een quote inladen met tekst en zonder auteur. */
        /* console.log(getQuote({auteur: false})); */
        /* Een willekeurige quote inladen met tekst en auteur. */
        /* console.log(getRandomQuote()); */
        /* Hieronder wordt een React-component opgesteld. De klassenaam moet altijd met hoofdletter beginnen. */
        class App extends React.Component {
            /* De button "#quote_inladen" koppelen aan de functie. */
            quote_inladen = () => {
                window.location.reload(false);
            };
            render() {
                return(
                    <div id="motivatie_inhoud">
                        <span id="motivatie_quote">{getQuote().tekst}</span>
                        <span id="motivatie_auteur">{getQuote().auteur}</span>
                        <input id="quote_inladen" type="button" class="achtergrond_bruin tekst_wit" value="Andere quote inladen" onClick={this.quote_inladen}></input>
                    </div>
                )
            }
        };
        /* Nu wordt de inhoud van bovenstaande React-component getoond in het div-element "#motivatie". */
        ReactDOM.createRoot(document.getElementById('motivatie')).render(<App />);
    })
    /* De procedure wordt stopgezet met foutvermelding. */
    .catch(error => {
        console.error('Er is fout gegaan met het inladen van de gegevens: ', error);
    });