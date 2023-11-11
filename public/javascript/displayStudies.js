if (window.location.href.includes("home.html")) {
  // Assuming fetchOwnStudies returns a Promise
  console.log("fetching studies");

  displayOwnStudies();
} else {
  const studiesToDisplay = localStorage.getItem("studiesToDisplay");
  if (studiesToDisplay !== null) {
    displayFriendStudies(studiesToDisplay);
  }
}

// function displayFriendStudies(username) {
//   let studies = fetchFriendStudies(username);
//   displayOwnStudies(studies);
// }

async function displayOwnStudies() {
  let studies = null;
  try {
    studies = await fetchOwnStudies();
    // Now you can work with the 'studies' data
    console.log(studies);
  } catch (error) {
    // Handle errors if needed
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

function fetchFriendStudies(friendUsername) {
  const token = localStorage.getItem("token");

  // Make a GET request to retrieve your friend's studies
  fetch(`/api/getStudies/${friendUsername}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((studies) => {
      // Handle the retrieved studies as needed
      console.log(`Retrieved studies for ${friendUsername}:`, studies);
    })
    .catch((error) => {
      console.error("Error fetching studies:", error);
    });
}

async function fetchOwnStudies() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`/api/getStudies/asdf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const studies = await response.json();
    console.log("Retrieved your own studies:", studies);
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
