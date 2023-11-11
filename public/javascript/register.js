function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Add validation for email and confirm password
  if (!username || !email || !confirmPassword || password !== confirmPassword) {
    if (!username) {
      alert("Please provide a username");
    } else if (!email) {
      alert("Please provide an email");
    } else if (!confirmPassword) {
      alert("Please confirm your password");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    return;
  }

  fetch("/api/registerUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log registration response
      alert("User registered successfully");
      localStorage.setItem("username", username);
      localStorage.setItem("token", data.token);
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      alert("Registration failed");
    });
}
