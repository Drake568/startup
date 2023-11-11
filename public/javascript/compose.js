// Function to add a new link field
function addLinkField() {
  const linksInput = document.querySelector(".links-input");
  const linkField = document.createElement("div");
  linkField.classList.add("link-field");

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("link-input");
  input.name = "links-input";
  input.placeholder = "https://www.example.com";

  const testButton = document.createElement("button");
  testButton.type = "button";
  testButton.classList.add("test-button");
  testButton.textContent = "Test";
  testButton.onclick = function () {
    testLink(input);
  };

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("remove-link");
  removeButton.textContent = "-";
  removeButton.onclick = function () {
    removeLinkField(linkField);
  };

  linkField.appendChild(input);
  linkField.appendChild(testButton);
  linkField.appendChild(removeButton);
  linksInput.appendChild(linkField);
}

// Function to remove a link field
function removeLinkField(linkField) {
  const linksInput = document.querySelector(".links-input");
  linksInput.removeChild(linkField);
}

// Function to test the link and update the iframe
function testLink(input) {
  const iframe = document.getElementById("study-iframe");
  const link = input.value.trim();
  if (link !== "") {
    iframe.src = link;
  }
}

function saveData() {
  const notesInput = document.getElementById("notes-input");
  const notesValue = notesInput.value;
  console.log(notesValue);

  const linkInputs = document.querySelectorAll(".link-input");
  const links = Array.from(linkInputs).map((input) => input.value);
  console.log(links);

  const newStudy = {
    associatedUser: localStorage.getItem("username"),
    note: notesValue,
    links: links,
    shared: true,
    timestamp: Date(), // Use Date() without new to get the current date/time
  };
  console.log(newStudy);

  postStudy(newStudy);

  alert("Notes and links saved to localStorage!");

  // Clear the form fields
  notesInput.value = "";
  linkInputs.forEach((input) => (input.value = ""));
}

// Attach event listeners
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveData);

// Initialize the notes and links input fields with the stored values from localStorage
const savedData = localStorage.getItem("savedData");
if (savedData) {
  const data = JSON.parse(savedData);
  document.getElementById("notes-input").value = data.notes;
  const linkInputs = document.querySelectorAll(".link-input");
  data.links.forEach((link, index) => {
    linkInputs[index].value = link;
  });
}

function postStudy(study) {
  console.log("Posting study:");

  // Make the POST request
  fetch("/api/addStudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("POST request successful:", data);
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
    });
  console.log("study posted");
  return true;
}
