// Login empty textarea
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
})

