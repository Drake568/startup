function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!verifyCredentials(username, password)) {
    alert("Invalid credentials");
    return;
  }
}

function verifyCredentials(username, password) {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const { token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Error during login:", error);
      alert("Invalid credentials");
    });

  return true;
}

function register() {
  window.location.href = "register.html";
}
