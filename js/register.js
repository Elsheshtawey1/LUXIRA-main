document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const firstName = document.getElementById("first-name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("error-message");

  
    const fullName = `${firstName} ${surname}`;

    
    if (!firstName || !surname || !email || !password || !confirmPassword) {
      errorMessage.innerText = "Please fill in all required fields!";
      return;
    }

    if (password.length < 6) {
      errorMessage.innerText = "Password must be at least 6 characters!";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.innerText = "Passwords do not match!";
      return;
    }

    const userData = {
      name: fullName,
      email,
      password,
      password_confirmation: confirmPassword,
    };

    console.log("Sending data:", userData);

    try {
      const response = await fetch("https://orientonline.info/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log("Server response:", result); 

      if (response.ok) {
        localStorage.setItem("authToken", result.token); 
        alert("Account created successfully!");
        window.location.href = "dashboard.html"; 
      } else {
        errorMessage.innerText = result.message || "Registration failed!";
      }
    } catch (error) {
      console.error("Error:", error);
      errorMessage.innerText =
        "Network error. Please check your internet connection!";
    }
  });
