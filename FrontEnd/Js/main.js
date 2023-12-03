// Gallery - category buttons

var buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
var categories = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];

var activeButton = document.querySelector(".filter__btn");
if (activeButton) {
  activeButton.classList.add("filter__btn--active");
}

for (var i = 0; i < categories.length; i++) {
  var button = document.createElement("button");
  button.textContent = categories[i];
  button.className = "filter__btn";
  buttonsContainer.appendChild(button);

  button.addEventListener("click", function() {
    if (activeButton) {
      activeButton.classList.remove("filter__btn--active");
    }

    this.classList.add("filter__btn--active");

    activeButton = this;

  });
}

var defaultButton = buttonsContainer.querySelector(".filter__btn");
if (defaultButton) {
  defaultButton.classList.add("filter__btn--active");
  activeButton = defaultButton;
}

var portfolioSection = document.querySelector("#portfolio");
if (portfolioSection) {
  var h2Element = portfolioSection.querySelector("h2");
  if (h2Element) {
    h2Element.insertAdjacentElement("afterend", buttonsContainer);
  }
}



// Gallery - show 
 async function initWorks() {
   const data = await getWorksFromApi();
   const galleryElement = document.querySelector('.gallery');
   let galleryHTML = '';
 
   data.forEach(item => {
     galleryHTML += `
       <figure>
         <img src="${item.imageUrl}">
         <figcaption>${item.title}</figcaption>
       </figure>
     `;
   });
 
   galleryElement.innerHTML = galleryHTML;
 }

 initWorks();
 
 
 