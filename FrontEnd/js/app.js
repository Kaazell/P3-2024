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

// Variables globales
let dataWorks = [];
let dataCategories = [];

// Création de la fonction de récupération des travaux depuis l'API
async function getWorks(data) {
  console.log(data);
  if (data === undefined) {
    try {
      const response = await fetch("http://localhost:5678/api/works");

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      dataWorks = await response.json();
      console.log(dataWorks);

      // Construction de la boucle for dans la fonction pour ajouter les données de data au DOM.
      for (let i = 0; i < dataWorks.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = dataWorks[i].imageUrl;
        figcaption.innerText = dataWorks[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
    } catch (erreur) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        erreur
      );
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      img.src = data[i].imageUrl;
      figcaption.innerText = data[i].title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  }
}

function onClick(filter) {
  let filtered = filter;
  document.querySelector(".gallery").innerHTML = "";
  getWorks(filtered);
}

function generateFilters(name, onClickFunction) {
  const button = document.createElement("button");
  button.innerText = name;
  button.addEventListener("click", onClickFunction);
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
