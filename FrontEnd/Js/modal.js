import { getWorks } from './api.js';

const btnEditModal = document.querySelector(".btnEditModal");
const aside1 = document.getElementById("aside1");
const aside2 = document.getElementById("aside2");
const modal1CloseBtn = document.querySelector("#aside1 .modal-close");
const modal2CloseBtn = document.querySelector("#aside2 .modal-close");
const modalGallery = document.querySelector("#aside1 .modalGallery");

// Modal 1 Gallery 

// Ouverture Modal de Gallerie
btnEditModal.addEventListener("click", async function() {
  aside1.removeAttribute("style");
  document.body.classList.add("modal-open");
  await fetchAndDisplayGallery();
});


// Fonction pour charger et afficher la galerie
async function fetchAndDisplayGallery() {
  try {
    const galleryData = await getWorks();

    let galleryHTML = '';
    galleryData.forEach(item => {
      galleryHTML += `
      <div class="image-container">
      <img src="${item.imageUrl}">
      <div class="delete-background">
        <i class="fa-solid fa-trash-can delete-icon"></i>
      </div>
    </div>
      `;
    });

    modalGallery.innerHTML = galleryHTML;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la galerie :", error);
  }
}

// Fonction pour afficher ou masquer un modal
function toggleModal(modal) {
    if (modal.style.display === "none" || modal.style.display === "") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }
  
// Redirection to Modal 2
const addPhotoBtn = document.getElementById("addPhotoBtn");

addPhotoBtn.addEventListener("click", function(event) {
  event.preventDefault();
  aside1.style.display = "none";
  aside2.style.display = "block";
});
  
// Redirection to Modal 1
const modalArrow = document.querySelector(".modal-arrow");
modalArrow.addEventListener("click", function(event) {
  event.preventDefault();
  aside1.style.display = "block";
  aside2.style.display = "none";
});
  


// Modal Gobal

// fermeture Modal
modal1CloseBtn.addEventListener("click", function(event) {
    event.preventDefault();
    aside1.style.display = "none";
    document.body.classList.remove("modal-open");
});
modal2CloseBtn.addEventListener("click", function(event) {
    event.preventDefault();
    aside2.style.display = "none";
    document.body.classList.remove("modal-open");
});