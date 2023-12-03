const apiUrl = 'http://localhost:5678/api';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de récupération des données');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erreur de récupération des données :', error);
  });


  async function getUserLogin() {
    const response = await fetch(apiUrl + "/user/login")
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  async function getCategories() {
    const response = await fetch(apiUrl + "/Categories")
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  async function getWorks() {
    const response = await fetch(apiUrl + "/works")
    console.log(response)
    const data = await response.json()
    console.log(data)
  }