import { getWorks } from './api.js';

// Conteneur des categories
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
const categories = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];


// Place la balise des boutons dans le html
const portfolioSection = document.querySelector("#portfolio");
if (portfolioSection) {
   const h2Element = portfolioSection.querySelector("h2");
   if (h2Element) {
     h2Element.insertAdjacentElement("afterend", buttonsContainer);
   }
 }
            // mentora
 //   const h2Element = document.querySelector("#portfolio h2");
 //     if (h2Element) {
 //       h2Element.insertAdjacentElement("afterend", buttonsContainer);
 //     }


// Crée les boutons par rapport au tableau des categories
let activeButton = null;

categories.forEach((category, index) => {
   let button = document.createElement("button");
   button.textContent = category;
   button.className = "filter__btn";
   button.setAttribute('data-category-id', index);

   buttonsContainer.appendChild(button);

   button.addEventListener("click", function() {
     const categoryId = parseInt(this.getAttribute('data-category-id'));

     if (activeButton) {
       activeButton.classList.remove("filter__btn--active");
     }

     this.classList.add("filter__btn--active");
     activeButton = this;

     filterWorksByCategory(categoryId);
   });
 });


// Filtre par categorie
async function filterWorksByCategory(categoryId) {
  const data = await getWorks();

   if (categoryId === 0) {
     displayAllWorks(data);
     return;
   }
   const filteredWorks = data.filter(work => work.categoryId === categoryId);
   const galleryElement = document.querySelector('.gallery');
   let galleryHTML = '';

   filteredWorks.forEach(item => {
     galleryHTML += `
       <figure>
         <img src="${item.imageUrl}">
         <figcaption>${item.title}</figcaption>
       </figure>
     `;
   });

   galleryElement.innerHTML = galleryHTML;
 }


// Active premier bouton par défaut
const firstButton = buttonsContainer.querySelector("button[data-category-id='0']");

firstButton.classList.add("filter__btn--active");
activeButton = firstButton;


// Affiche la galerie
const galleryElement = document.querySelector('.gallery');
let galleryHTML = '';

function displayAllWorks(works) {
  works.forEach(item => {
  galleryHTML += `
    <figure>
      <img src="${item.imageUrl}">
      <figcaption>${item.title}</figcaption>
    </figure>
    `;
  });
  galleryElement.innerHTML = galleryHTML;
}

// Active la galerie
filterWorksByCategory(0);



//Admin mode
document.addEventListener("DOMContentLoaded", () => {
  const bearerAuth = window.localStorage.getItem("bearerAuth");
  const editModeBanner = document.getElementById("editModeBanner");
  const categoryButtons = document.querySelectorAll(".filter__btn");
  const backgroundBar = document.querySelector(".background-bar"); 

  if (bearerAuth) {
    editModeBanner.style.top = "0";
    categoryButtons.forEach(button => {
      button.style.display = "none";
    });
  } else {
    backgroundBar.classList.add("hidden");
  }
});

// Déconnexion admin
document.addEventListener("DOMContentLoaded", () => {
  const bearerAuth = window.localStorage.getItem("bearerAuth");
  const loginLogout = document.getElementById("loginLogoutLink");

  if (bearerAuth) {
    loginLogout.textContent = "Logout";
  }

  loginLogout.addEventListener("click", () => {
    if (bearerAuth) {
      window.localStorage.removeItem("bearerAuth");
      window.location.replace("index.html");
    } else {
    }
  });
});