// VARIABLES GLOBALES (VG)
var deck;

// VG - DEALER
var dealerPoints =0;
var dealerAce = 0;
var hiddenCard;

// VG - PLAYER
var playerPoints;
var playerAce;
var hitCard;


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



function startGame() {

    hiddenCard = deck.pop();
    dealerPoints += getCardValue(hiddenCard);
    dealerAce += checkAce(hiddenCard);
    console.log(hiddenCard);
    console.log(dealerPoints);


}

function getCardValue(card) {

    // Recibe el nombre de la carta retirada del deck de 52 cartas y devuelve su valor a partir del 
    // nombre dado: "LETRA/NUMERO-PINTA"
    let nameCard = card.split("-");
    let cardValue = nameCard[0];

    if(isNaN(cardValue)) {
        if (cardValue == "A") {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(cardValue)
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    } 
    return 0;
}

window.onload = function () {
    initialState();
    createDeck();
    startGame();
}