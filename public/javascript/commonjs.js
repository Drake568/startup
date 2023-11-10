// Get the "name" from local storage
const storedName = localStorage.getItem("name");

// Update the header with the stored name
const headerName = document.getElementById("header-name");
if (storedName) {
  headerName.textContent = storedName;
} else {
  headerName.textContent = "Default Name"; // Provide a default name if "name" is not found in local storage
}

document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.getElementById("logoutLink");

  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default behavior of the link
      logout();
    });
  }

  function logout() {
    localStorage.clear();
    window.location.href = "index.html";
  }
});
