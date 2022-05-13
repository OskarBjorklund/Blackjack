const färger = ["S", "H", "D", "C"];
const valörer = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const värde = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, "Ess"];

// Klass för att skapa spelkort
class Kort {
  constructor(valör, färg, värde) {
    this.valör = valör;
    this.färg = färg;
    this.värde = värde;
  }
}

// Klass för stack
class Kortlek {
  constructor() {
    this.stack = [];
  }

  // Lägg ett kort överst i leken
  lägg_till_kort(item) {
    this.stack.push(item);
  }
  // Ta ett kort överst från leken
  dra_kort() {
    let draget_kort = this.stack.pop();
    return draget_kort;
  }

  // Visa korten som finns i leken (I ordning)
  visa_lek() {
    this.stack.forEach((kort) => {
      console.log(kort.valör, kort.färg, kort.värde);
    });
  }

  // Visa hur många kort som finns
  visa_längd() {
    console.log(`Kortleken har ${this.stack.length} kort`);
  }

  // Blanda leken
  blanda() {
    for (let i = this.stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.stack[i];
      this.stack[i] = this.stack[j];
      this.stack[j] = temp;
    }
  }
}