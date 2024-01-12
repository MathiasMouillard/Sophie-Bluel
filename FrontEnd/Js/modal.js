import { getWorks } from './api.js';

const btnEditModal = document.querySelector(".btnEditModal");
const aside1 = document.getElementById("aside1");
const aside2 = document.getElementById("aside2");
const modal1CloseBtn = document.querySelector("#aside1 .modal-close");
const modal2CloseBtn = document.querySelector("#aside2 .modal-close");
const modalArrow = document.querySelector("#aside2 .modal-arrow");
const modalGallery = document.querySelector("#aside1 .modalGallery");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const btnAjouterPhoto = document.getElementById("searchPhoto");
const inputPhotoFile = document.getElementById("photoFile");
const uploadContainer = document.getElementById("uploadContainer");


// -- Modal Global

// Redirection to Modal 2
addPhotoBtn.addEventListener("click", function(event) {
  event.preventDefault();
  aside1.style.display = "none";
  aside2.style.display = "block";
});
  
// Redirection to Modal 1
modalArrow.addEventListener("click", function(event) {
  event.preventDefault();
  aside1.style.display = "block";
  aside2.style.display = "none";
});

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


// -- Modal 1 Gallery 

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
        <i class="fa-solid fa-trash-can delete-icon" data-image-id="${item.id}"></i>
      </div>
    </div>
      `;
    });

    modalGallery.innerHTML = galleryHTML;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la galerie :", error);
  }
}
 
// photo selection
btnAjouterPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    inputPhotoFile.click();
});

// Ajoutez un gestionnaire d'événements change à l'élément d'entrée de fichier.
inputPhotoFile.addEventListener("change", (event) => {
    // Vous pouvez accéder au fichier sélectionné par l'utilisateur via event.target.files[0].
    const selectedFile = event.target.files[0];
    
   
    if (selectedFile) {
        // Créez un objet URL pour l'affichage de l'image sélectionnée.
        const imageURL = URL.createObjectURL(selectedFile);        
        // Create img
        const img = new Image();
        img.src = imageURL;       
        // Resize file
        img.style.maxHeight = "100%";
        img.style.maxWidth = "100%";        
        // Delete content
        uploadContainer.innerHTML = '';        
        // Add file
        uploadContainer.appendChild(img);
    }
});
