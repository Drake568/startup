if (window.location.href.includes("home.html")) {
  displayStudies(localStorage.getItem("username"));
} else {
  const studiesToDisplay = localStorage.getItem("studiesToDisplay");
  if (studiesToDisplay !== null) {
    displayStudies(studiesToDisplay);
  }
}

async function displayStudies(username) {
  let studies = null;
  try {
    studies = await fetchStudies(username);
    console.log(studies);
  } catch (error) {
    console.error("Error in fetchData:", error);
  }

  const studiesList = document.getElementById("studies-list");
  if (studiesList !== null) {
    studiesList.innerHTML = "";

    for (study of studies) {
      studiesList.appendChild(createStudyElement(study));
    }
  }
}

async function fetchStudies(userName) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`/api/getStudies/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const studies = await response.json();
    return studies;
  } catch (error) {
    console.error("Error fetching studies:", error);
    throw error; // Propagate the error so the caller can handle it if needed
  }
}

function createStudyElement(study) {
  // Create a new item container for each saved study
  const studyContainer = document.createElement("div");
  studyContainer.classList.add("item-container");

  // Create a header element to display the date
  const dateHeader = document.createElement("h3");
  dateHeader.textContent = study.timestamp.toLocaleString();

  // Create a header element for notes
  const notesHeader = document.createElement("h4");
  notesHeader.textContent = "Notes";

  // Create a paragraph element to display the notes
  const notesParagraph = document.createElement("p");
  notesParagraph.textContent = study.note;

  // Create a header element for links
  const linksHeader = document.createElement("h4");
  linksHeader.textContent = "Links";

  // Append the headers and notes to the study container
  studyContainer.appendChild(dateHeader);
  studyContainer.appendChild(notesHeader);
  studyContainer.appendChild(notesParagraph);
  studyContainer.appendChild(linksHeader);

  // Create link elements for each saved link
  study.links.forEach(function (link) {
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
