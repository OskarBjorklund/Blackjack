let dealer_hand = [];
let spelare_hand = [];

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
  for (let i = 0; i <= kort.length - 1; i++){
    if (kort[i].värde == "Ess"){
      if (11 + handsumma > 21){
        handsumma += 1;
      }
      else{
        handsumma += 11;
      }
    }
    else{
    handsumma += kort[i].värde;
    console.log(kort[i]);
    }
  }
  return handsumma;
}

let kortlek = ny_kortlek();

kortlek.blanda();

spelare_hand.push(kortlek.dra_kort());

spelare_hand.push(kortlek.dra_kort());

spelare_hand.push(kortlek.dra_kort());

console.log(spelare_hand);


console.log(värdera(spelare_hand));