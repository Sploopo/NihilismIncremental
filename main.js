var nih = 10
var gens = []
var lastUp = Date.now()
for(let i = 0; i < 4; i++) {
    let g = {
        price: Math.pow(Math.pow(10, i), i),
        bought: 0,
        amount: 0,
        mult: 1
    }
    gens.push(g)
}
function format(amount) {
    let pow = Math.floor(Math.log10(amount))
    let man = amount / Math.pow(10, pow)
    if(pow < 3) return amount.toFixed(2)
    if(pow < 6) return man.toFixed(2) + "K"
    if(pow < 9) return man.toFixed(2) + "M"
    if(pow < 12) return man.toFixed(2) + "B"
    if(pow < 15) return man.toFixed(2) + "T"
    if(pow < 18) return man.toFixed(2) + "Qa"
    if(pow < 21) return man.toFixed(2) + "Qi"
    if(pow < 24) return man.toFixed(2) + "Sx"
    if(pow < 27) return man.toFixed(2) + "Sp"
    if(pow < 30) return man.toFixed(2) + "Oc"
    if(pow < 33) return man.toFixed(2) + "No"
    if(pow < 36) return man.toFixed(2) + "Dc"
    if(pow < 39) return man.toFixed(2) + "UDc"
    if(pow < 42) return man.toFixed(2) + "DDc"
    return man.toFixed(2) + "e" + pow
}
function buyGen(i) {
    let g = gens[i - 1]
    if(g.price > nih) return
    nih -= g.price
    g.amount += 1
    g.bought += 1
    g.mult *= 1.1
    g.price *= 2
}
function upG() {
    document.getElementById("ni").textContent = "You have " + format(nih) + " nihilism"
    for (let i = 0; i < 4; i++) {
      let g = gens[i]
      let thing = "Alpha"
      switch(i) {
        case 0:
            thing = "Alpha";
            break;
        case 1:
            thing = "Beta";
            break;
        case 2:
            thing = "Gamma";
            break;
        default:
            thing = "Delta";
            break;
      }
      document.getElementById("g"+(i+1)).innerHTML = "Generator " + thing + "<br>Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "x<br>Cost: " + format(g.price)
    }
  }
  
  function genLoop(diff) {
    nih += gens[0].amount * gens[0].mult * diff
    for (let i = 1; i < 4; i++) {
      gens[i - 1].amount += gens[i].amount * gens[i].mult * diff / 5
    }
  }
  
  function theLoop() {
    var diff = (Date.now() - lastUp) / 1000
  
    genLoop(diff)
    upG()
  
    lastUp = Date.now()
  }
  
  setInterval(theLoop, 50)
  
  upG()