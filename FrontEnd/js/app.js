// Suppression de la galerie faite en HTML
document.querySelector(".gallery").remove();

// Création de la div gallery pour pouvoir y append les éléments de la boucle for ensuite
const gallery = document.createElement("div");
gallery.className = "gallery";
document.querySelector("#portfolio").appendChild(gallery);

// Création de la div Categories pour pouvoir y append les éléments de la boucle for ensuite
const categories = document.createElement("div");
categories.className = "categories";
document.querySelector("#h2").appendChild(categories);

// Récupération des travaux
getWorks();
getCategories();

// Variables globales (assurez-vous de les définir correctement)
let dataWorks = []; // Définissez correctement ces variables avec vos données
let dataCategories = []; // Définissez correctement ces variables avec vos données

// Création de la fonction de récupération des travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    dataWorks = await response.json();

    // Construction de la boucle for dans la fonction pour ajouter les données de data au DOM.
    for (let i = 0; i < dataWorks.length; i++) {
      buildGallery(dataWorks[i]);
    }
  } catch (erreur) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      erreur
    );
  }
}

// Fonctions à insérer dans la boucle
function buildGallery(workData) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = workData.imageUrl;
  figcaption.innerText = workData.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

function onClick(filteredData) {
  // Implémentez le comportement souhaité ici
  console.log(filteredData);
}

function generateFilters(name, onClickFunction) {
  const button = document.createElement("button");
  button.innerText = name;
  button.addEventListener("click", () => onClickFunction());
  categories.append(button);
}

// Création de la fonction de récupération des catégories depuis l'API
async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    dataCategories = await response.json();
    console.log(dataCategories);
    // Construction de la boucle for dans la fonction pour ajouter les données de data au DOM.
    generateFilters("Tous", () =>
      onClick(dataWorks.filter((work) => work.userId === 1))
    );
    generateFilters(dataCategories[0].name, () =>
      onClick(dataWorks.filter((work) => work.category.id === 1))
    );
    generateFilters(dataCategories[1].name, () =>
      onClick(dataWorks.filter((work) => work.category.id === 2))
    );
    generateFilters(dataCategories[2].name, () =>
      onClick(dataWorks.filter((work) => work.category.id === 3))
    );
  } catch (erreur) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      erreur
    );
  }
}
