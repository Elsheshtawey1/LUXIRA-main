document
  .getElementById("set-password-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("message");

    if (password.length < 8) {
      message.innerText = "Password must be at least 8 characters.";
      return;
    }

    if (password !== confirmPassword) {
      message.innerText = "Passwords do not match!";
      return;
    }

    try {
      const response = await fetch(
        "https://orientonline.info/api/password/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("resetEmail"), 
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Password updated successfully! Redirecting to login.");
        window.location.href = "../Password Updated.html/"; 
      } else {
        message.innerText = result.message || "Failed to reset password.";
      }
    } catch (error) {
      console.error("Error:", error);
      message.innerText = "Network error. Try again later.";
    }
  });


function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}
