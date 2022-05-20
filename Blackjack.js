function ny_kortlek(){
  
  /*
  Skapar en kortlek genom att loopa igenom
  alla tillgängliga valörer och färger och
  lägger dessa i en stack.
  Stacken innehåller objekt som skapas
  ur klassen "kort"
  Därefter returneras kortleken
  */
 
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
  /*
  Funktionen värdera anropas 
  med argumentet kort, där kort
  är en kortlek.
  Funktionen deklarerar en
  handsumma samt antal ess i din 
  kortlek. Hädanefter så loopas
  kortleken igenom anropats som argument.
  Looparna kollar om attributet (värde)
  på enskilt kort är "ess", annars
  adderas endast attributet (värde)
  till handsumman. I slutändan returneras handsumman.
  */
   
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
  /*
  Om det visar sig att kortleken innehåller ess
  så måste dessa tas till hänsyn då ess kan vara
  både 11 och 1 bereonde på resten av kortleken.
  Därför sparas antal ess i din kortlek
  och loopas igenom enskilt för att
  göra en bedömning om specifikt ess 
  i kortleken ska anta värdet 11 eller 1.
  Därefter adderas antigen 11 eller 1.
  */
 
  for(let i = 0; i < antal_ess; i++){
    if (handsumma+11*(antal_ess-i) > 21){ //Om specifikt ess antar 11 men överstiger 21 antar esset 1, annars 11.
      handsumma += 1;
    }
    else {
      handsumma += 11;
    }
  }
  return handsumma;
}

window.onload = function starta_spel(){
  //Huvudfunktionen starta_spel() som körs när sidan öppnas.
  //Här tilldelas spelare och dealer sina kort och här sker
  //all koppling till HTML sker också här.

  let kan_hit = true; //Deklarerar att kan_hit är sant vilket ger en tillgång att dra ett kort

  let kortlek = ny_kortlek(); //Skapar en kortlek ur funktionen ny_kortlek

  kortlek.blanda(); //Blandar kortleken med funktionen blanda() som finns i kortlek.js

  let dealer_hand = []; //Deklarerar en dealer hand
  let spelare_hand = []; //Deklarerar en spelar hand
  let dealer_gömd_hand = []; //Deklarerar en den gömda handen hos dealern

  
  let gömt_kort = kortlek.dra_kort(); //Drar ett gömt åt dealern

  //Lägger till det gömda kortet i dealerns hand samt den gömda handen
  dealer_gömd_hand.push(gömt_kort); 
  dealer_hand.push(gömt_kort);
  
  /*
  Denna bit av koden är allt som behövs för att dra ett kort. Detta kort läggs därefter till i din hand
  samt till skrämen så att du kan se en bild på kortet.
  */
 
  let kortImg = document.createElement("img"); //Skapar ett kortImg som elementet "img"
  let kort = kortlek.dra_kort(); //Drar ett kort ur kortleken
  dealer_hand.push(kort); //Lägger till kortet i dealerns_hand

  /*
  Vi låter kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png";
  såsom korten i mappen cards är döpta så heter ett kort först sin valör, ex 2, eller A (ace, eller ess)
  sedan ett bindestreck "-" och tillsist sin färg, ex H (Hearts, hjärter), ex 2-H, A-C
  På detta sätt kan vi enkelt genom attributeten på kortet komma just rätt kort.
  Efter kortImg är deklarerar som en specific filsökväg på specifikt kort så
  lägger vi till Elementet kortImg genom append.
  */
 
  kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"; 
  document.getElementById("dealer_kort").append(kortImg);

  /*
  Här bestämmer vi vad innerTexten på just dealerns summa blir.
  Just i denna situation med dealerns två första kort så måste vi subrahera med dealarns
  gömda hand då man inte ska ha någon föraning vilket kort som gömmer sig.
  */
  document.getElementById("dealer_summa").innerText = (värdera(dealer_hand)-värdera(dealer_gömd_hand) + " + ?");
  
  for (let i = 0; i < 2; i++){
    /*
    Här ser vi precis samma procedur igenom fast med en
    for loop där spelaren tilldelas 2st kort.
    Tillskillad från att tilldela kort till dealern
    så används spelarens variabler istället
    men annars fungerar denna bit kod precis
    likadant fast i en forloop.
    */

    let kortImg = document.createElement("img");
    let kort = kortlek.dra_kort();
    spelare_hand.push(kort);
    
    kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"
    document.getElementById("spelare_kort").append(kortImg)
    document.getElementById("spelare_summa").innerText = värdera(spelare_hand);
  }


  //Dessa två rader ger spelaren alternativet att dra ett till kort eller att stanna
  document.getElementById("hit").addEventListener("click", hit); //Anropar funktionen hit om man klickar på knappen hit
  document.getElementById("stanna").addEventListener("click", stanna); //Anropar funktionen stanna om man klickar på knappen stanna

  function hit() {
    /*
    Kollar först om kan_hit är sant annars 
    returneras ingeting. Om kan_hit är sant
    så dras helt enkelt ett kort på precis samma
    sätt som förut. Däremot om värdet på spelarens
    hand är större än 21 så blir kan_hit falskt
    då man inte ska få dra flera kort om man 
    redan förlorat.
    */
   
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
      stanna() //Funktionen stanna anropas för att avsluta
      }
    }

  function stanna(){
    /*
    Funktionen stanna avslutar spelet och ser till
    att du inte kan dra flera kort. Det gömda kortet avslöjas och dealalern
    drar kort tills den får över 17. Därefter redovisas resultaten.
    */

    kan_hit = false;
    
    document.getElementById("gömt").src = "./cards/"+ dealer_hand[0].valör + "-" + dealer_hand[0].färg + ".png";

    while (värdera(dealer_hand) < 17){
      /*
      Här dras kort åt dealern på precis samma sätt som förut fast med
      en whileloop som körs så länge dealerns hands värde är mindre än 17.
      */

      let kortImg = document.createElement("img");
      let kort = kortlek.dra_kort();
      dealer_hand.push(kort);
  
      kortImg.src = "./cards/"+ kort.valör + "-" + kort.färg + ".png"
      document.getElementById("dealer_kort").append(kortImg)
    }

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
    document.getElementById("dealer_summa").innerText = värdera(dealer_hand);//värde av dealerns hand skrivs ut ovanför dess kort
    document.getElementById("spelare_summa").innerText = värdera(spelare_hand);//värde av spelarens hand skrivs ut ovanför dess kort
    document.getElementById("resultat").innerText = resultat;
    //resultat, om man har vunnit, förloat eller spelat oavgjort som skrivs ut under knapparna hit, stanna och ny runda
    
    document.getElementById("ny_runda").addEventListener("click", ny_runda); //Anropar funktionen ny_runda om man klickar på kanppaen ny runda
    
    
    function ny_runda(){
      //anropar ett kommand som reloadar BROWSERn
      document.location.reload()
    }
  }  
}