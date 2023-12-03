// Filtre par categorie
async function filterWorksByCategory(categoryId) {
   const data = await getWorksFromApi();

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

// Affiche la galerie
function displayAllWorks(works) {
   const galleryElement = document.querySelector('.gallery');
   let galleryHTML = '';

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

// Conteneur des categories
var buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
var categories = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];

var activeButton = null;

// Crée les boutons par rapport au tableau des categories
categories.forEach((category, index) => {
   var button = document.createElement("button");
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

// Active premier bouton par défaut
var firstButton = buttonsContainer.querySelector("button[data-category-id='0']");
firstButton.classList.add("filter__btn--active");
activeButton = firstButton;

// Place la balise des boutons dans le html
var portfolioSection = document.querySelector("#portfolio");
if (portfolioSection) {
   var h2Element = portfolioSection.querySelector("h2");
   if (h2Element) {
     h2Element.insertAdjacentElement("afterend", buttonsContainer);
   }
 }

filterWorksByCategory(0);
