// VARIABLES GLOBALES
var deck;

function initialState() {
    //Ocultar elementos de la mesa principal, solo mostrar las instrucciones y el botón de iniciar juego
    document.getElementById('deck-and-buttons-container').style.display = 'none'
    document.getElementById('cards-and-results').style.display = 'none'
}

function createDeck() {
    // Crea el mazo de cartas
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"]
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i])
        }
    }
    shuffleDeck(deck)
    //console.log(deck)
}

function shuffleDeck(arr) {
    // mezcla el mazo de manera aleatoria usando algoritmo fisher-yates
    let i = arr.length;
    while (--i > 0) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
    }
    return arr;
}

window.onload = function () {
    initialState();
    createDeck();
}