var frisAmount = 0;
const frisPrice = 2.20;

var bierAmount = 0;
const bierPrice = 2.50;

var wijnAmount = 0;
const wijnPrice = 3.50;

var snackTotalBowl8 = 0;
const snackPrice8 = 4.20;

var snackTotalBowl16 = 0;
const snackPrice16 = 7.40;

var currentDrinkType = "none";

var elementDrank = document.getElementById("sectionDrank");
var elementRekeningDrankTotaal = document.getElementById("rekeningDrankTotaal");
var elementRekeningDrankFris = document.getElementById("rekeningDrankFris");
var elementRekeningDrankBier = document.getElementById("rekeningDrankBier");
var elementRekeningDrankWijn = document.getElementById("rekeningDrankWijn");

var elementSnack = document.getElementById("sectionSnack");
var elementSnackTotaal = document.getElementById("rekeningSnackTotaal");
var elementRekeningSnack8 = document.getElementById("rekeningSnack8");
var elementRekeningSnack16 = document.getElementById("rekeningSnack16");

var elementSnackDrankTotaal = document.getElementById("snackDrankTotaal");
var drankTotal = 0;
var snackTotal = 0;

function startOrder(){
	var orderType = prompt("Wat wilt u bestellen? (Drank, Snack)");
	if (orderType.toLowerCase() == "drank"){
		orderDrink();
	} else if (orderType.toLowerCase() == "snack"){
		orderSnack();
	} else {
		alert("Dat staat niet op ons menu!");
		startOrder();
	}
}

function orderDrink(){
	var drinkType = prompt("Welk drankje wilt u bestellen? (Fris, Bier of Wijn) | Type 'Stop' om de bestelling te stoppen.");
	if (drinkType.toLowerCase() == "fris" || drinkType.toLowerCase() == "bier" || drinkType.toLowerCase() == "wijn"){
		currentDrinkType = drinkType;
		orderDrinkAmount();
	} else if (drinkType.toLowerCase() == "stop"){
		alert("U heeft de bestelling gestopt!");
	} else {
		alert("Dat is geen drankje!");
		orderDrink();
	}
}

function orderDrinkAmount(){
	var drinkTypeAmount = parseInt(prompt("Hoeveel " + currentDrinkType + " wil je bestellen?") );
	if (isNaN(drinkTypeAmount)){
		alert("Voer een getal in.");
		orderDrinkAmount();
	} else {
		if (currentDrinkType.toLowerCase() == "fris"){
			frisAmount += drinkTypeAmount;
			var totalPrice = frisAmount*frisPrice;
		    elementRekeningDrankFris.innerText = "Drank: Fris | Hoeveelheid: " + frisAmount + " | Prijs: \u20AC" + totalPrice.toFixed(2);
		} else if (currentDrinkType.toLowerCase() == "bier"){
			bierAmount += drinkTypeAmount;
			var totalPrice = bierAmount*bierPrice;
		    elementRekeningDrankBier.innerText = "Drank: Bier | Hoeveelheid: " + bierAmount + " | Prijs: \u20AC" + totalPrice.toFixed(2);
		} else if (currentDrinkType.toLowerCase() == "wijn"){
			wijnAmount += drinkTypeAmount;
			var totalPrice = wijnAmount*wijnPrice;
		    elementRekeningDrankWijn.innerText = "Drank: Wijn | Hoeveelheid: " + wijnAmount + " | Prijs: \u20AC" + totalPrice.toFixed(2);
		}
		var subtotalPrice = (wijnAmount*wijnPrice) + (frisAmount*frisPrice) + (bierAmount * bierPrice);
		elementRekeningDrankTotaal.innerText = "Subtotaal: \u20AC" + subtotalPrice.toFixed(2);		

		drankTotal = subtotalPrice;
		var totalPrice = drankTotal + snackTotal;
		elementSnackDrankTotaal.innerText = "Totaal: \u20AC" + totalPrice.toFixed(2);
		elementDrank.style.visibility = "visible";
		orderDrink();
	}
}

function orderSnack(){
	var snackAmount = prompt("Hoeveel bitterballen wilt u toevoegen? (8 of 16)");
	if (snackAmount.toLowerCase() == "stop"){
		alert("U heeft de bestelling gestopt!");
	} else if (isNaN(parseInt(snackAmount))){
		alert("Voer een getal in.")
		orderSnack();
	} else {
		if (snackAmount == 8 || snackAmount == 16){
			orderSnackBowl(snackAmount);
		} else {
			alert("De hoeveelheid bitterballen moet 8 of 16 zijn.")
			orderSnack();
		}
	}
}

function orderSnackBowl(amount){
	var snackAmountBowl = parseInt(prompt("Hoeveel bitterbalschalen van " + amount + " stuks wilt u bestellen?"));
	if (isNaN(snackAmountBowl)){
		alert("Voer een getal in.");
		orderSnackBowl(amount);
	} else {
		if (amount == 8){
			snackTotalBowl8 += snackAmountBowl;
			var totalPrice = snackTotalBowl8 * snackPrice8;

			elementRekeningSnack8.innerText = "8 Bitterballen | Schalen: " + snackTotalBowl8 + " | Prijs: \u20AC" + totalPrice.toFixed(2);
		} else if (amount == 16){
			snackTotalBowl16 += snackAmountBowl;
			var totalPrice = snackTotalBowl16 * snackPrice16;

			elementRekeningSnack16.innerText = "16 Bitterballen | Schalen: " + snackTotalBowl16 + " | Prijs: \u20AC" + totalPrice.toFixed(2);
		}
		var subtotalPrice = (snackTotalBowl8 * snackPrice8) + (snackTotalBowl16 * snackPrice16);
		elementSnackTotaal.innerText = "Subtotaal: \u20AC" + subtotalPrice.toFixed(2);	

		snackTotal = subtotalPrice;
		var totalPrice = snackTotal + drankTotal;
		elementSnackDrankTotaal.innerText = "Totaal: \u20AC" + totalPrice.toFixed(2);
		elementSnack.style.visibility = "visible";
		orderSnack();
	}
}