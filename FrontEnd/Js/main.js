// Gallery - show gallery
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