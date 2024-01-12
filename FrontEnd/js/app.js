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
let modal = null;

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

// Bannière noire "Mode édition"
const token = sessionStorage.getItem("token");
const editBanner = document.querySelector("#edit");
const logButton = document.querySelector("#log");
// La bannière est invisible lorsque l'utilisateur n'est pas connecté.
editBanner.style.visibility = "collapse";

function connected() {
  // Si le token = true, on fait apparaitre la bannière et le login devient logout
  if (token) {
    edit.style.visibility = "visible";
    logButton.innerHTML =
      '<a style="color: black; text-decoration: none;" href="login.html">logout</a>';
      categories.style.visibility = "collapse"
      categories.style.height = 0
  }
}
connected();

// L'utilisateur est déconnecté et le token retiré lorsqu'il clique sur logout
logButton.addEventListener("click", () => {
  if (logButton.innerText === "logout") {
    sessionStorage.removeItem("token");
  }
});

// Modale
const openModal = function (e) {
  e.preventDefault();

  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

const modalDisp = document.querySelector(".modal-wrapper");

function displayGalleryModal(data) {
  const gallery = document.createElement("div");
  modalDisp.append(gallery);
  gallery.className = "works-modal";
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].id)
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let crossImg = document.createElement("i");
    let figCaption = document.createElement("figcaption");
    crossImg.setAttribute('id', data[i].id);

    crossImg.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    crossImg.addEventListener('click', function (event) {
      deleteWorks(data[i].id);
      alert('Supression du work id=' + data[i].id);
    })
    img.src = data[i].imageUrl;
    figCaption.innerText = data[i].title;

    gallery.append(figure);
    figure.append(crossImg);
    figure.append(img);
    figure.append("éditer");
  }
}

async function getJsonModal() {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Une erreur est survenue.");
    }
    const dataModal = await response.json();
    displayGalleryModal(dataModal);
    const hr = document.createElement("hr");
    const galleryEdit = document.createElement("div");
    galleryEdit.setAttribute("id", "gallery-edit-buttons");
    galleryEdit.innerHTML =
      "<button class='gallery-edit'>Ajouter une photo</button><button id='delete-gallery' class='delete-gallery'>Supprimer la galerie</button>";
    modalDisp.append(hr);
    modalDisp.append(galleryEdit);
  } catch (error) {
    alert(error.message);
  }
}

getJsonModal();

// Delete
function deleteWorks(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
          'content-type': "application/Json",
          'authorization': "Bearer " + sessionStorage.getItem("token"),
      },
  })
};