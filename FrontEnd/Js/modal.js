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
const photoTitleInput = document.getElementById("photoTitle");
const categorySelect = document.getElementById("categorySelect");
const submitPhotoBtn = document.getElementById("submitPhoto");
const bearerAuth = JSON.parse(localStorage.getItem("bearerAuth"));
const imageContainers = document.querySelectorAll('.image-container')
const galleryElement = document.querySelector('.gallery');

// --- Modal Global ---
// Open Modal 2
function openModal2(e) {
  e.preventDefault();
  aside1.style.display = "none";
  aside2.style.display = "block";
}
// Open Modal 1
function openModal1(e) {
  e.preventDefault();
  aside1.style.display = "block";
  aside2.style.display = "none";
}
// Refresh Modal
function refreshModal(e) {
  e.preventDefault();
  aside1.style.display = "none";
  aside2.style.display = "none";
  document.body.classList.remove("modal-open");
}

// Redirection vers Modal 2
addPhotoBtn.addEventListener("click", openModal2);
// Redirection vers Modal 1
modalArrow.addEventListener("click", openModal1);
// Fermeture de Modal 1
modal1CloseBtn.addEventListener("click", refreshModal);
// Fermeture de Modal 2
modal2CloseBtn.addEventListener("click", refreshModal);


// --- Modal 1 Gallery 

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
      <div class="image-container" data-image-id="${item.id}">
      <img src="${item.imageUrl}" >
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
 
// photo selection
btnAjouterPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    inputPhotoFile.click();
});

// Ajoutez un gestionnaire d'événements change à l'élément d'entrée de fichier.
inputPhotoFile.addEventListener("change", (event) => {
    // fichier sélectionné par l'utilisateur via event.target.files[0].
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
        // Hide content
        const uploadContainer = document.getElementById("uploadContainer");
        const uploadContainerChildren = uploadContainer.children;
        for (let i = 0; i < uploadContainerChildren.length; i++) {
         uploadContainerChildren[i].style.display = "none";
        }
        // Add file
        uploadContainer.appendChild(img);
    }
});


// --- Ajout Image
function getFormValues() {
  const title = photoTitleInput.value;
  const category = categorySelect.value;
  const file = inputPhotoFile.files[0];
  return { title, category, file };
}

// Event du formulaire
submitPhotoBtn.addEventListener("click", async () => {
    // Récupére les valeurs du titre, catégorie et du fichier image
    const { title, category, file } = getFormValues();
    // Crée un objet FormData et y ajoute les données
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerAuth.token}`,
          accept: "application/json",
        },
        body: formData,
      });
      if (response.ok) {
            console.log("içi")            
        const galleryItem = await getWorks();

        let galleryHTML = '';
        galleryItem.forEach(item => {
          galleryHTML += `
            <figure>
              <img src="${item.imageUrl}">
              <figcaption>${item.title}</figcaption>
            </figure>
          `;
        });
          galleryElement.innerHTML = galleryHTML;
          imageContainers.innerHTML = galleryHTML;
          
          const uploadContainer = document.getElementById("uploadContainer");
          const uploadContainerChildren = uploadContainer.children;
          photoTitleInput.value = "";
          categorySelect.value = "";
          inputPhotoFile.value = "";
          const uploadedImage = uploadContainer.querySelector('img');
          if (uploadedImage) {
            uploadedImage.remove();
          }
          for (let i = 0; i < uploadContainerChildren.length; i++) {
            uploadContainerChildren[i].style.display = "block";
          }
      } else {
          alert("Erreur lors de l'ajout de l'image à votre API.");
        }
    } catch (error) {
        console.error("Erreur lors de la requête vers l'API :", error);
        alert("Une erreur s'est produite lors de la communication avec l'API.");
    }
});


// Fonction pour valider le formulaire
inputPhotoFile.addEventListener("change", validateForm);
photoTitleInput.addEventListener("input", validateForm);
categorySelect.addEventListener("input", validateForm);

function validateForm() {
  const { title, category, file } = getFormValues();

  if (title && category && file) {
    submitPhotoBtn.disabled = false;
    submitPhotoBtn.classList.remove('disabled-button');
  } else {
    submitPhotoBtn.disabled = true;
    submitPhotoBtn.classList.add('disabled-button');
  }
}


// delete Img

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-icon")) {
    // Get parent
    const imageContainer = event.target.closest(".image-container");
    if (imageContainer) {
      // Get img id
      const imageId = imageContainer.getAttribute("data-image-id");
      try {
        // Request api for delete img
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${bearerAuth.token}`,
          },
        });

        if (response.ok) {
          await fetchAndDisplayGallery();
        } else {
          console.error("La suppression de l'image dans l'API a échoué.");
        }
      } catch (error) {
        console.error("Erreur lors de la requête DELETE vers l'API :", error);
      }
    }
  }
});
