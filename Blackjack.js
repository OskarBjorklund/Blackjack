let kortlek = new Kortlek();

for (let i = 0; i < valörer.length; i++) {
    for (let j = 0; j < färger.length; j++) {
          let kort = new Kort(valörer[i], färger[j], värde[i]);
          kortlek.lägg_till_kort(kort);
  }
}
console.log(kortlek.visa_lek());

let dealer_hand = [];
let spelare_hand = [];
