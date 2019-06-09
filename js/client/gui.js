let counters = {}
counters.population = document.getElementById("res_pop");
counters.wood = document.getElementById("res_wood");
counters.stone = document.getElementById("res_stone");
counters.gold = document.getElementById("res_gold");
counters.uranium = document.getElementById("res_uranium");


counters.population.innerHTML = "100+";

// Minimum graphical interface
var upperDiv = document.getElementById("info");
function setDiv( text ) { upperDiv.innerHTML = text; }
function logDiv( text ) { upperDiv.innerHTML += text + "<br>"; }