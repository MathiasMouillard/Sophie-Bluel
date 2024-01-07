const apiUrl = 'http://localhost:5678/api';

  
async function getUserLogin(loginFormDatas) {
  try {
  
  const response = await fetch(apiUrl + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginFormDatas),
});
  return response;
} catch (error) {
  console.error('Erreur de récupération des données :', error.message);
  return [];
}
};


async function getCategories() {
  try {
  const response = await fetch(apiUrl + "/categories");
  if (!response.ok) {
    throw new Error('Erreur de récupération des données');
  }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur de récupération des données :', error.message);
    return [];
  }
};
 

async function getWorks() {
  try {
    const response = await fetch(apiUrl + "/works");
    if (!response.ok) {
      throw new Error('Erreur de récupération des données');
    }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur de récupération des données :', error.message);
      return [];
  }
};


export { getUserLogin, getCategories, getWorks };  