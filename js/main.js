// VARIABLES GLOBALES (VG)
var deck;

// VG - DEALER
var dealerPoints =0;
var dealerAce = 0;
var hiddenCard;

// VG - PLAYER
var playerPoints;
var playerAce;
var canHitCard = true;


function initialState() {
    //Ocultar elementos de la mesa principal, solo mostrar las instrucciones y el botón de iniciar juego
    document.getElementById('deck-and-buttons-container').style.display = 'none'
    document.getElementById('cards-and-results').style.display = 'none'
}


function createDeck() {
    // Crea el mazo de cartas iterando valores por cada pinta
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


function showGame()  {
    // Muestra las condiciones iniciales del juego al presionar el boton start game
    startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame)
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
    // revisa si la carta recibida es un As. devuelve 1 si es verdadero y 0 si no lo es
    if (card[0] == "A") {
        return 1;
    } 
    return 0;
}


function startGame() {

    // funcion de juego principal

    // Muestra los elementos ocutlos de la condición inicial
    document.getElementById('deck-and-buttons-container').style.display = 'block';
    document.getElementById('cards-and-results').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('top-instruction').style.paddingTop = '9.5%'

    // Saca una carte del mazo para darle valor a la carta volteada del dealer
    hiddenCard = deck.pop();
    dealerPoints += getCardValue(hiddenCard); // Devuelve el valor de dicha carta
    dealerAce += checkAce(hiddenCard); // Valida si la carta volteada es un As
    // console.log(hiddenCard);
    // console.log(dealerPoints);

    // Entrega cartas al dealer mienstras que la suma sea inferior a 17 (contando la carta oculta)
    while (dealerPoints < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/cards/" + card + ".png";
        dealerPoints += getCardValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerPoints)

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "/cards/" + card + ".png";
        playerPoints += getCardValue(card);
        playerAce += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById('hit-button').addEventListener('click', hitForCard)
    document.getElementById('hold-button').addEventListener('click', holdPoints)
}


function hitForCard() {

    if (!canHitCard) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "/cards/" + card + ".png";
    playerPoints += getCardValue(card);
    playerAce += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (transformAce(playerPoints, playerAce) > 21) {
        canHitCard = false;
    }

    showLenghtDeck();
}


function holdPoints() {
    dealerPoints = transformAce(dealerPoints, dealerAce);
    playerPoints = transformAce(playerPoints, playerAce);

    canHitCard = false;
    document.getElementById('hidden-card').src = "/cards/" + hiddenCard + ".png";

    // Validar si jugador o dealaer se pasan de 21 puntos
    let resultMessage = "";
    if (playerPoints > 21) {
        resultMessage = "YOU LOSE!";
    } else if (dealerPoints > 21) {
        resultMessage = "YOU WIN!";
    } else if (playerPoints == dealerPoints) {  // Comparar el resultado de las sumas de puntas si ninguno se ha pasado
        resultMessage = 'TIE!'
    }  else if (playerPoints > dealerPoints) {
        resultMessage = "YOU WIN!";
    } else if (playerPoints < dealerPoints) {
        resultMessage = "YOU LOSE!"
    }

    document.getElementById('result-message').innerText = resultMessage

}


function transformAce(playerPoints, playerAce) {
    // Si la suma es mayor a 21, se reestablece el valor de la As (ya no vale 11 sino que vale 1) y
    // se le resta uno al contador de As que tiene el jugador (playerAce)
    while (playerPoints > 21 && playerAce > 0) {
        playerPoints -= 10;
        playerAce -= 1;
    }
    return playerPoints;
}


window.onload = function () {
    // Al cargar la pagina, ejecuta las siguientes funciones
    initialState();
    createDeck();
    showGame();
}