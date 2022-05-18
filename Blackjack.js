

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
    console.log(kort[i]);
    if (kort[i].värde == "Ess"){
      antal_ess += 1;
    }
    else {
    handsumma += kort[i].värde;
    }
  }
  for (let i = 0; i < antal_ess; i++){
    if (handsumma+11*(antal_ess-i) > 21){
      handsumma += 1;
    }
    else {
      handsumma += 11;
    }
  }
  
  return handsumma;
}

function starta_spel(){
  let kortlek = ny_kortlek();

  kortlek.blanda()

  let dealer_hand = [];
  let spelare_hand = [];
  
  for(let i = 0; i < 2; i++){
    dealer_hand.push(kortlek.dra_kort());
    spelare_hand.push(kortlek.dra_kort());
  }
}

starta_spel()


//spelare_hand.push(kortlek.dra_kort()); 