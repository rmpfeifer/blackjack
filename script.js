
var playerCards = [];
var dealerCards = [];
var wins = 0;
var losses = 0;
var playerAces = 0;
var dealerAces = 0;
for (t = 3; t <= 9; t++) {
    document.getElementById("pc" + t).style.opacity = 0;
    document.getElementById("dc" + t).style.opacity = 0;
}
dealerHit();
hit();
hit();
//above is basically the reset function but for when the page loads




function reset() {
    playerCards = [];
    dealerCards = [];
    playerAces = 0;
    dealerAces = 0;
    //need to add something to clear canvases here
    console.clear();
    document.getElementById("overlay").style.display = "none";
    document.getElementById("score").innerHTML = wins + " hands won.<br>" + losses + " hands lost.";
    for (t = 1; t <= 9; t++) {
        canvasclear("dcc" + t);
        canvasclear("pcc" + t);
    }
    for (l = 3; l <= 9; l++) {
        document.getElementById("pc" + l).style.opacity = 0;
        document.getElementById("dc" + l).style.opacity = 0;
    }
    dealerHit();
    hit();
    hit();
}

//returns a random number from 2-11. If it draws a face card (12 - 14), return a 10 instead
function card() {
    let x = Math.floor(Math.random() * 13) + 2;
    if (x == 12 || x == 13 || x == 14) {
        x = 10
    }
    return x
}

function add(total, num) {
    return total + num;
}                   //The calc function returns the sum of every element in an array, the add function is needed for it to work. 
function calc(arr) { //Input is an array
return arr.reduce(add)
}

function hit() {
    let x = card();
    playerCards.push(x);
    if (x == 11) { // detects if the player has just drawn an ace
        playerAces++;
        console.log("Just drew an ace");
    }
    console.log("Player cards: " + playerCards);
    console.log("Player total: " + calc(playerCards));
    drawPcard(x);
    if (calc(playerCards) == 21) { //is it a blackjack? if so, just immediatly win.
        pwin();
    }
    didPlayerJustBust();
    if (playerCards.length == 9) {
        stand();
    }
}
function didPlayerJustBust() { // This little chunk of code detects if the player has any aces, and if so, automatically converts the value of one of them to 1
    if (calc(playerCards) > 21) {
        if (playerAces > 0) {
            for (i = 0; i < playerCards.length; i++) {
                if (playerCards[i] == 11) {
                    playerCards[i] = 1;
                    playerAces--;
                    break;
                }
            }
            console.warn("Player went bust with an ace, automatically changing one of them from 11 to 1");
            console.log("Player cards: " + playerCards);
            console.log("Player total: " + calc(playerCards));
            didPlayerJustBust();
        } else {
            dwin();
        }
    }
}
function didDealerJustBust() { // This little chunk of code detects if the player has any aces, and if so, automatically converts the value of one of them to 1
    if (calc(dealerCards) > 21) {
        if (dealerAces > 0) {
            for (i = 0; i < dealerCards.length; i++) {
                if (dealerCards[i] == 11) {
                    dealerCards[i] = 1;
                    dealerAces--;
                    break;
                }
            }
            console.warn("Dealer went bust with an ace, automatically changing one of them from 11 to 1");
            console.log("Dealer cards: " + dealerCards);
            console.log("Dealer total: " + calc(dealerCards));
            didDealerJustBust();
        } else {
            pwin();
        }
    }
}

function dealerHit() {
    let x = card();
    dealerCards.push(x);
    if (x == 11) { // detects if the dealer has just drawn an ace
        dealerAces++;
        console.log("Just drew an ace");
    }
    console.log("Dealer cards: " + dealerCards);
    console.log("Dealer total: " + calc(dealerCards));
    drawDcard(x);
}

function stand() { //when you stand, calc the dealers cards then decide who wins.
    while (calc(dealerCards) < 16 && dealerCards.length < 9) {
        dealerHit();
    }

    if (calc(dealerCards) == 21) { //who wins?
        dwin();
    } else if (calc(dealerCards) > 21) {
        didDealerJustBust();
    } else if (calc(dealerCards) > calc(playerCards)) {
        dwin();
    } else if (calc(dealerCards) == calc(playerCards)) {
        tie();
    } else {
        pwin();
    }
}

function pwin() { // player wins
console.log("Player wins");
document.getElementById("overlaytext").innerHTML = "You won this hand!";
document.getElementById("overlay").style.display = "block";
wins++;
}
function dwin() { // dealer wins
console.log("Dealer wins");
document.getElementById("overlaytext").innerHTML = "The dealer won this hand.";
document.getElementById("overlay").style.display = "block";
losses++;
}
function tie() { // nobody wins
console.log("Nobody wins, TIE");
document.getElementById("overlaytext").innerHTML = "You and the dealer tied.";
document.getElementById("overlay").style.display = "block";
}

function a() {
    console.error("You called a funtion that you haven't completed.") // this exists to let me know if I forgot something
}
function test() {
    console.log(card()); //test function please ignore
}




///////////////////////////////////////////////////////////////////////////////// past here is the nightmare of adding cards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//these draw functions require the card number that was pulled (2 - 11)
function drawPcard(num) {
    document.getElementById("pc" + playerCards.length).style.opacity = 1;
    if (num == 11) {
        drawDace("pcc" + playerCards.length);
    } else if (num == 10) {
        drawd10("pcc" + playerCards.length);
    } else if (num == 9) {
        drawd9("pcc" + playerCards.length);
    } else if (num == 8) {
        drawd8("pcc" + playerCards.length);
    } else if (num == 7) {
        drawd7("pcc" + playerCards.length);
    } else if (num == 6) {
        drawd6("pcc" + playerCards.length);
    } else if (num == 5) {
        drawd5("pcc" + playerCards.length);
    } else if (num == 4) {
        drawd4("pcc" + playerCards.length);
    } else if (num == 3) {
        drawd3("pcc" + playerCards.length);
    } else if (num == 2) {
        drawd2("pcc" + playerCards.length);
    } else {
        console.error("Failure drawing card");
    }
   }
function drawDcard(num) {
    document.getElementById("dc" + dealerCards.length).style.opacity = 1;
    if (num == 11) {
        drawDace("dcc" + dealerCards.length);
    } else if (num == 10) {
        drawd10("dcc" + dealerCards.length);
    } else if (num == 9) {
        drawd9("dcc" + dealerCards.length);
    } else if (num == 8) {
        drawd8("dcc" + dealerCards.length);
    } else if (num == 7) {
        drawd7("dcc" + dealerCards.length);
    } else if (num == 6) {
        drawd6("dcc" + dealerCards.length);
    } else if (num == 5) {
        drawd5("dcc" + dealerCards.length);
    } else if (num == 4) {
        drawd4("dcc" + dealerCards.length);
    } else if (num == 3) {
        drawd3("dcc" + dealerCards.length);
    } else if (num == 2) {
        drawd2("dcc" + dealerCards.length);
    } else {
        console.error("Failure drawing card");
    }
}


function drawDace(obj) {// input is the canvas you wish to draw on
let canvas = document.getElementById(obj);
if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#100000";
    ctx.moveTo(35,110);
    ctx.lineTo(35,30);
    ctx.lineTo(65,30);
    ctx.lineTo(65,110);
    ctx.moveTo(65,70);
    ctx.lineTo(35,70);
    ctx.stroke();
}
}
function drawd2(obj) {// input is the canvas you wish to draw on
let canvas = document.getElementById(obj);
if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#100000";
    ctx.moveTo(35,30);
    ctx.lineTo(65,30);
    ctx.lineTo(65,70);
    ctx.lineTo(35,70);
    ctx.lineTo(35,110);
    ctx.lineTo(65,110);
    ctx.stroke();
}
}
function drawd3(obj) {// input is the canvas you wish to draw on
let canvas = document.getElementById(obj);
if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#100000";
    ctx.moveTo(35,30);
    ctx.lineTo(65,30);
    ctx.lineTo(65,70);
    ctx.lineTo(35,70);
    ctx.moveTo(35,110);
    ctx.lineTo(65,110);
    ctx.lineTo(65,70);
    ctx.stroke();
}
}
function drawd3(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(35,30);
        ctx.lineTo(65,30);
        ctx.lineTo(65,70);
        ctx.lineTo(35,70);
        ctx.moveTo(35,110);
        ctx.lineTo(65,110);
        ctx.lineTo(65,70);
        ctx.stroke();
    }
}
function drawd4(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(35,30);
        ctx.lineTo(35,70);
        ctx.lineTo(65,70);
        ctx.moveTo(65,30);
        ctx.lineTo(65,110);
        ctx.stroke();
    }
}
function drawd5(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(65,30);
        ctx.lineTo(35,30);
        ctx.lineTo(35,70);
        ctx.lineTo(65,70);
        ctx.lineTo(65,110);
        ctx.lineTo(35,110);
        ctx.stroke();
    }
}
function drawd6(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(65,30);
        ctx.lineTo(35,30);
        ctx.lineTo(35,70);
        ctx.lineTo(65,70);
        ctx.lineTo(65,110);
        ctx.lineTo(35,110);
        ctx.lineTo(35,70);
        ctx.stroke();
    }
}
function drawd7(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(35,30);
        ctx.lineTo(65,30);
        ctx.lineTo(36,110);
        ctx.stroke();
    }
}
function drawd8(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(65,30);
        ctx.lineTo(35,30);
        ctx.lineTo(35,70);
        ctx.lineTo(65,70);
        ctx.lineTo(65,110);
        ctx.lineTo(35,110);
        ctx.lineTo(35,70);
        ctx.moveTo(65,70);
        ctx.lineTo(65,30);
        ctx.stroke();
    }
}
function drawd9(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(65,30);
        ctx.lineTo(35,30);
        ctx.lineTo(35,70);
        ctx.lineTo(65,70);
        ctx.lineTo(65,30);
        ctx.lineTo(65,110);
        ctx.lineTo(35,110);
        ctx.stroke();
    }
}
function drawd10(obj) {// input is the canvas you wish to draw on
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#100000";
        ctx.moveTo(65,30);
        ctx.lineTo(35,30);
        ctx.lineTo(35,110);
        ctx.lineTo(65,110);
        ctx.lineTo(65,30);
        ctx.moveTo(25,30);
        ctx.lineTo(25,110);
        ctx.stroke();
    }
}

function canvasclear(obj) {// input is the canvas you wish to clear
    let canvas = document.getElementById(obj);
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
} 