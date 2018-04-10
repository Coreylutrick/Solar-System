const PrintToDom = (domString, divId) => 
{
  document.getElementById(divId).innerHTML = domString;
};

let newPlanet = "";

const buildDomString = (planetArray) => 
{
  let domString = ""
  planetArray.forEach((planet) =>
  {
    domString += `<div class ="planet">`
    domString +=  `<h1 class="planetName">${planet.name}</h1>`;
    domString +=  `<img class="planetImg hidden" data-planet-id="${planet.name}" src="${planet.image}" alt="Image of planet">`;
    domString +=  `<p class="hidden">${planet.description}</p>`;
    domString += `</div>`;
  });
  PrintToDom(domString, "planet-holder")
};

const buildDomString2 = (planetArray) =>
{
  let domString=""
    domString += `<div class="bigPlanet">`;
    domString +=  `<button id="xBtn">X</button>`
    domString +=  `<h2 class="planetName">${planetArray.name}</h2>`;
    domString +=  `<img class="planetImg" src="${planetArray.image}" alt="picture of planet">`
    domString +=  `<p>${planetArray.description}`
    domString += `</div>`;
  PrintToDom(domString, "planet-holder")
  document.getElementById("xBtn").addEventListener("click", startApp)
}

const planetHide = (e) => 
{
  e.target.children[0].classList.remove("hidden");
  e.target.children[1].classList.add("hidden");
};

const nameHide = (e) => 
{
  e.target.children[0].classList.add("hidden");
  e.target.children[1].classList.remove("hidden");
};

const newPlanetShow = (e) =>
{
  console.log(e)
  newPlanet = e.target.dataset.planetId;
  startApp2();
}

function planetCheck() 
{
  const data = JSON.parse(this.responseText);
  data.planets.forEach(planet => 
    {
      if(newPlanet === planet.name)
      {
        buildDomString2(planet);
      } 
    });
}

const addMouseEnterListener = () => 
{
  const planetCards = document.getElementsByClassName("planet");
  for(let i = 0; i<planetCards.length; i++)
  {
    planetCards[i].addEventListener("mouseenter", nameHide);
    planetCards[i].addEventListener("click", newPlanetShow)
  }
};

const addMouseLeaveListener = () => 
{
  const planetCards = document.getElementsByClassName("planet");
  for(let i = 0; i<planetCards.length; i++)
  {
    planetCards[i].addEventListener("mouseleave", planetHide)
  }
};

function executeThisCodeAfterFileLoaded () 
{
  const data = JSON.parse(this.responseText);
  buildDomString(data.planets);
  addMouseEnterListener();
  addMouseLeaveListener();
}


function executeThisCodeIfXHRFails () 
{
  console.log("something went wrong");
}


const startApp = () => 
{
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("get", "planets.json");
  myRequest.send();
};

const startApp2 = () => 
{
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", planetCheck);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("get", "planets.json");
  myRequest.send();
};



startApp();