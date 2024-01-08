import { getWorks } from './api.js';

const btnEditModal = document.querySelector(".btnEditModal");
const aside1 = document.getElementById("aside1");
const modalCloseBtn = document.querySelector("#aside1 .modal-close");
const modalGallery = document.querySelector("#aside1 .modalGallery");

// Ouverture Modal de Gallerie
btnEditModal.addEventListener("click", async function() {
  aside1.removeAttribute("style");
  document.body.classList.add("modal-open");
  await fetchAndDisplayGallery();
});
// fermeture Modal de Gallerie
modalCloseBtn.addEventListener("click", function(event) {
  event.preventDefault();
  aside1.style.display = "none";
  document.body.classList.remove("modal-open");
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

