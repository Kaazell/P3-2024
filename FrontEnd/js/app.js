// Suppression de la galerie faite en html
document.querySelector(".gallery").remove();
// Création de la div gallery pour pouvoir y append les élements de la boucle for ensuite
const gallery = document.createElement("div");
gallery.className = "gallery";
document.querySelector("#portfolio").appendChild(gallery);

// Récupération des travaux
getWorks();

//Création de la fonction de récupération des travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    // Construction de la boucle for dans la fonction pour ajouter les données de data au DOM.
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
  } catch (erreur) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      erreur
    );
  }
}
