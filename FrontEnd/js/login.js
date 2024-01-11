// Connexion //
// Récupération du formulaire et des inputs.
const form = document.querySelector("form");
const url = "http://localhost:5678/api/users/login";

// Ecoute du submit
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  // On prévient le comportement par défaut du submit.
  e.preventDefault();

  // On crée l'objet que nous enverrons par requête POST
  let adminInfo = {
    email: email.value,
    password: password.value,
  };

  //  Appel à l'API qui renvoie une réponse 2xx ou 4xx
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(adminInfo),
  });
  // Ce qu'il se passe si le statue de la requete API est du statut 200: d'abord récuperer les données recues sur l'api au format JSON
  if (response.ok) {
    // enregistrement du Token dans le local storage afin de pouvoir s'en servir pour la suite du Projet
    const data = await response.json();
    sessionStorage.setItem("token", data.token);

    // Rediriger l'utilisateur sur la page d'accueil
    window.location.href = "index.html";
  } else {
    alert("Identifiant ou mot de passe incorrect.");
  }
}
