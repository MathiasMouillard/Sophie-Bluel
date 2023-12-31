import { getUserLogin } from './api.js';

const bearerAuth = window.localStorage.getItem("bearerAuth");

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const previousError = document.querySelector(".error");
    if (previousError) {
        previousError.remove();
    }

    const email = e.target.querySelector("[name=email]").value;
    const password = e.target.querySelector("[name=password]").value;
    
    const loginFormDatas = { email, password };
    
    try {
        const response = await fetch(getUserLogin(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginFormDatas),
        });
    
        if (response.ok) {
            const body = await response.json();
            window.localStorage.setItem("bearerAuth", JSON.stringify(body));
            window.location.replace("index.html");
    
        } else if (response.status === 404 || response.status === 401) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error");
            errorDiv.textContent = "Identification incorrecte"; // Message d'erreur
    
            const errorContainer = document.createElement("div");
            errorContainer.classList.add("error-container");
    
            errorContainer.appendChild(errorDiv);
    
            const submitButton = document.querySelector("#btnSubmitLogin");
            submitButton.insertAdjacentElement("beforebegin", errorContainer);
        }
    
    } catch (error) {
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error");
        errorDiv.textContent = error.message;
        document.querySelector("form").prepend(errorDiv);
    }
});