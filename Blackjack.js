let kan_hit = true;

function ny_kortlek(){
  let kortlek = new Kortlek();

  for (let i = 0; i < valörer.length; i++) {
      for (let j = 0; j < färger.length; j++) {
            let kort = new Kort(valörer[i], färger[j], värde[i]);
            kortlek.lägg_till_kort(kort);
    }
  }
  return kortlek;
}


function värdera(kort){
  let handsumma = 0;
  let antal_ess = 0;
  for (let i = 0; i <= kort.length - 1; i++){
    if (kort[i].värde == "Ess"){
      antal_ess += 1;
    }
    else {
    handsumma += kort[i].värde;
    }
  }
  for(let i = 0; i < antal_ess; i++){
    if (handsumma+11*(antal_ess-i) > 21){
      handsumma += 1;
    }
    else {
      handsumma += 11;
    }
  }
  
  return handsumma;
}


window.onload = function starta_spel(){
  let kortlek = ny_kortlek();

  kortlek.blanda()

  let dealer_hand = [];
  let spelare_hand = [];

  let gömt_kort = kortlek.dra_kort();
  dealer_hand.push(gömt_kort);

  while (värdera(dealer_hand) < 17){
    let kortImg = document.createElement("img");
    let kort = kortlek.dra_kort();
    dealer_hand.push(kort);

    kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"
    document.getElementById("dealer_kort").append(kortImg)
  }
  console.log(värdera(dealer_hand))

  for (let i = 0; i < 2; i++){
    let kortImg = document.createElement("img");
    let kort = kortlek.dra_kort();
    spelare_hand.push(kort);
    
    kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"
    document.getElementById("spelare_kort").append(kortImg)
    document.getElementById("spelare_summa").innerText = värdera(spelare_hand);
  }

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stanna").addEventListener("click", stanna);


  function hit() {
    if (!kan_hit){
      return;
    }
    let kortImg = document.createElement("img");
    let kort = kortlek.dra_kort();
    spelare_hand.push(kort);
      
    kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"
    document.getElementById("spelare_kort").append(kortImg);
    document.getElementById("spelare_summa").innerText = värdera(spelare_hand);

    if (värdera(spelare_hand) > 21){
      kan_hit = false;
      console.log(värdera(spelare_hand));
    }
  }

  function stanna(){
    kan_hit = false;
    document.getElementById("gömt").src = "./cards/"+ dealer_hand[0].valör + "-" + dealer_hand[0].färg + ".png";

    let resultat = "";
    if (värdera(spelare_hand) > 21){
      resultat = "Du förlorade!"
    }
    else if (värdera(dealer_hand) > 21){
      resultat = "Du vann!"
    }
    else if (värdera(spelare_hand) == värdera(dealer_hand)){
      resultat = "Oavgjort!"
    }
    else if (värdera(spelare_hand) > värdera(dealer_hand)){
      resultat = "Du vann!"
    }
    else if (värdera(spelare_hand) < värdera(dealer_hand)){
      resultat = "Du förlorade!"
    }
    document.getElementById("dealer_summa").innerText = värdera(dealer_hand);
    document.getElementById("spelare_summa").innerText = värdera(spelare_hand);
    document.getElementById("resultat").innerText = resultat;
  }
  
}


//spelare_hand.push(kortlek.dra_kort()); 