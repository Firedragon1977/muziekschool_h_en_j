import React from 'react';
/* "react-dom" wordt niet langer meer gebruikt in React 18 of hoger. Gebruik hiervoor een functie "react-dom/client". */
import ReactDOM from 'react-dom/client';
/* Meerdere stijlen in één variabele zetten. Let wel dat de React-verwijzingen net wat anders zijn dan die van CSS-verwijzingen. */
const stijl = {
    color: 'black',
    background: 'yellow',
    width: '200px',
    borderRadius: '5px',
    border: '2px solid black',
    listStyleType: 'circle',
    padding: '10px',
    margin: '5px 0px',
    fontStyle: 'italic',
    textAlign: 'center'
};
/* Favoriete stad. De klassenaam moet altijd met hoofdletter beginnen. */
class Stad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stad: '#stad'};
    };
    render() {
        return <li style={stijl}>Mijn favoriete stad is {this.state.stad}</li>;
    };
};
/* Favoriet boek. De klassenaam moet altijd met hoofdletter beginnen. */
class Boek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {boek: '#boek'};
    };
    render() {
        return <li style={stijl}>Mijn favoriete boek is {this.state.boek}</li>;
    };
};
/* "ReactDOM.render" wordt niet langer meer gebruikt vanaf React 18. Gebruik hiervoor een functie "ReactDOM.createRoot". De twee bovenstaande klassen worden hieronder bij elkaar gezet in één lijst. */
ReactDOM.createRoot(document.getElementById('root')).render(<ul><Stad /><Boek /></ul>);