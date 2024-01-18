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

// Api gallery modal
function generateGalleryHTML(data) {
  let galleryHTML = '';
  data.forEach(item => {
    galleryHTML += `
      <div class="image-container" data-image-id="${item.id}">
        <img src="${item.imageUrl}" >
        <div class="delete-background">
          <i class="fa-solid fa-trash-can delete-icon"></i>
        </div>
      </div>
    `;
  });
  return galleryHTML;
}

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
// Close Modal
function closeModal(e) {
  e.preventDefault();
  aside1.style.display = "none";
  aside2.style.display = "none";
  document.body.classList.remove("modal-open");
}

// Redirection to Modal 2
addPhotoBtn.addEventListener("click", openModal2);
// Redirection to Modal 1
modalArrow.addEventListener("click", openModal1);
// Close Modals
modal1CloseBtn.addEventListener("click", closeModal);
// Close Modal 2
modal2CloseBtn.addEventListener("click", closeModal);


// --- Modal 1 Gallery 

// Open gallery modal
btnEditModal.addEventListener("click", async function() {
  aside1.removeAttribute("style");
  document.body.classList.add("modal-open");
  await fetchGallery();
});

// Load and display gallery
async function fetchGallery() {
  try {
    const galleryData = await getWorks();
    const galleryHTML = generateGalleryHTML(galleryData);
    modalGallery.innerHTML = galleryHTML;
    galleryElement.innerHTML = galleryHTML;   
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la galerie :", error);
  }
}
 

// --- Modal 2 Form

// photo selection
btnAjouterPhoto.addEventListener("click", (event) => {
    event.preventDefault();
    inputPhotoFile.click();
});

// change container to file
inputPhotoFile.addEventListener("change", (event) => {
    //  File selected by user for event.target.files[0].
    const selectedFile = event.target.files[0];       
    if (selectedFile) {
        // Create url item
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


// ---- Adding Image Api

function getFormValues() {
  const title = photoTitleInput.value;
  const category = categorySelect.value;
  const file = inputPhotoFile.files[0];
  return { title, category, file };
}
async function fetchForModalGallery() {
  try {
    const galleryData = await getWorks();
    const galleryHTML = generateGalleryHTML(galleryData);
    modalGallery.innerHTML = galleryHTML;    
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la galerie :", error);
  }
}

// Form event
submitPhotoBtn.addEventListener("click", async () => {
    // Receive title , category and img file value
    const { title, category, file } = getFormValues();
    // create FormData & adding data
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
        fetchForModalGallery();
        galleryElement.innerHTML = galleryHTML;              
        
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


// Form validation
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


// ---- Delete Img
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
          await fetchGallery();
        } else {
          console.error("La suppression de l'image dans l'API a échoué.");
        }
      } catch (error) {
        console.error("Erreur lors de la requête DELETE vers l'API :", error);
      }
    }
  }
});

