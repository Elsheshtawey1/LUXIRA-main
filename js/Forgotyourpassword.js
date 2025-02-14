document
  .getElementById("forgot-password-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); 

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    try {
      const response = await fetch(
        "https://orientonline.info/api/password/reset-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        message.style.color = "green";
        message.innerText = "Reset link sent! Check your email.";
      } else {
        message.innerText = result.message || "Failed to send reset link.";
      }
    } catch (error) {
      console.error("Error:", error);
      message.innerText = "Network error. Try again later.";
    }
  });
