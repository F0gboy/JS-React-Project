let headlineAnimalTypeElement = document.getElementById("headlineAnimalType");
let factContainerElement = document.getElementById("factContainer");
let btnRefreshElement = document.getElementById("btnRefresh");

let radioCatElement = document.getElementById("radioCat");
let radioDogElement = document.getElementById("radioDog");
let radioHorseElement = document.getElementById("radioHorse");

function getSelectedAnimal() {
  if (radioCatElement.checked) return "cat";
  if (radioDogElement.checked) return "dog";
  if (radioHorseElement.checked) return "horse";
  return null;
}

btnRefreshElement.onclick = function () {
  factContainerElement.innerText = "...";
  updateFact();
}

function updateFact() {
  let selectedAnimal = getSelectedAnimal();
  headlineAnimalTypeElement.innerText = selectedAnimal;
  
  fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=" + selectedAnimal)
    .then(response => {
      if (!response.ok) throw new Error("Response from API was not OK: " + response.status);
      return response.json();
    })
    .then(json => json.text)
    .then(fact => factContainerElement.innerText = fact)
    .catch(error => {
      console.error(error);
      factContainerElement.innerHTML = "<i style='color:red'>Failed to get fact</i>";
    })
}

updateFact();