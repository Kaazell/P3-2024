// Suppression de la galerie faite en html
document.getElementById("portfolio").remove();

//Récupération des travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (erreur) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      erreur
    );
  }
}

for (let i = 0; i < data.length; i++) {}

getWorks();
