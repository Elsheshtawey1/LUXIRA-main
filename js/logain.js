document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
      const response = await fetch("https://orientonline.info/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", result.token);
        alert("Login Successful!");
        window.location.href = "../home.html"; 
      } else {
        errorMessage.innerText = result.message; 
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.innerText = "Something went wrong. Please try again!";
    }
  });
