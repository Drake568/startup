// Function to display saved studies
function displaySavedStudies() {
  const studiesList = document.getElementById("studies-list");

  // Clear the current list to avoid duplicates
  studiesList.innerHTML = "";

  // Retrieve saved data from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith(`${localStorage.getItem("studiesToDisplay")}-study-`)) {
      const data = JSON.parse(localStorage.getItem(key));
      studiesList.appendChild(createStudyElement(key, data));
    }
  }
}

function createStudyElement(key, data) {
  // Extract the timestamp from the key
  const timestamp = key.replace(
    `${localStorage.getItem("studiesToDisplay")}-study-`,
    ""
  );
  // Create a new item container for each saved study
  const studyContainer = document.createElement("div");
  studyContainer.classList.add("item-container");

  // Create a header element to display the date
  const dateHeader = document.createElement("h3");
  dateHeader.textContent = new Date(parseInt(timestamp)).toLocaleString();

  // Create a header element for notes
  const notesHeader = document.createElement("h4");
  notesHeader.textContent = "Notes";

  // Create a paragraph element to display the notes
  const notesParagraph = document.createElement("p");
  notesParagraph.textContent = data.notes;

  // Create a header element for links
  const linksHeader = document.createElement("h4");
  linksHeader.textContent = "Links";

  // Append the headers and notes to the study container
  studyContainer.appendChild(dateHeader);
  studyContainer.appendChild(notesHeader);
  studyContainer.appendChild(notesParagraph);
  studyContainer.appendChild(linksHeader);

  // Create link elements for each saved link
  data.links.forEach(function (link) {
    if (link.trim() !== "") {
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.textContent = link;
      linkElement.target = "study-iframe";
      linkElement.classList.add("study-link");
      studyContainer.appendChild(linkElement);
    }
  });
  return studyContainer;
}

if (window.location.href.includes("home.html")) {
  localStorage.setItem("studiesToDisplay", localStorage.getItem("username"));
} else if (window.location.href.includes("explore.html")) {
  if (
    localStorage.getItem("username") == localStorage.getItem("studiesToDisplay")
  ) {
    localStorage.setItem("studiesToDisplay", localStorage.getItem(""));
  }
}
displaySavedStudies();
