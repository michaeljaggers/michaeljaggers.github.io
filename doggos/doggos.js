const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  const img = document.createElement("img");
  img.alt = "Loading"
  img.src = ("./loadinggif.gif")
  img.className = "doggo-image";
  doggos.appendChild(img);
  const promise = fetch(DOG_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
    });
}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);