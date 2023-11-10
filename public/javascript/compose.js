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

  const linkInputs = document.querySelectorAll(".link-input");
  const links = Array.from(linkInputs).map((input) => input.value);

  // Check if notesValue is not empty and there are links
  if (notesValue.trim() !== "" || links.some((link) => link.trim() !== "")) {
    const data = {
      notes: notesValue,
      links: links,
    };
    localStorage.setItem(
      `${localStorage.getItem("username")}-study-${new Date().getTime()}`,
      JSON.stringify(data)
    );
    alert("Notes and links saved to localStorage!");

    // Clear the form fields
    notesInput.value = "";
    linkInputs.forEach((input) => (input.value = ""));
  }
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
