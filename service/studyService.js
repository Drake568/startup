// studyService.js

const { json } = require("body-parser");

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let studyMap = new Map();

function addStudyToMap(data) {
  let username = data.study.associatedUser;
  if (!studyMap.has(username)) {
    studyMap.set(username, new Set([data.study]));
  } else {
    studyMap.get(username).add(data.study);
  }
}

function getStudies(username, shared = true) {
  const studiesSet = studyMap.get(username);
  return [...studiesSet];
}

function getFriendStudies(username) {
  const studiesSet = studyMap.get(username);
  if (studiesSet) {
    const studiesArray = [...studiesSet].filter((study) =>
      study.shared ? true : false
    );
    return studiesArray;
  } else {
    console.error("Username not found.");
    return [];
  }
}

function updateStudy(username, studyId, newNote, newLinks) {
  const studiesSet = studyMap.get(username);

  if (studiesSet) {
    const studyToUpdate = [...studiesSet].find((study) => study.id === studyId);

    if (studyToUpdate) {
      // Update the properties if they are provided
      if (newNote !== undefined) {
        studyToUpdate.note = newNote;
      }

      if (newLinks !== undefined) {
        studyToUpdate.links = newLinks;
      }
    } else {
      console.error("Study not found with the given ID.");
    }
  } else {
    console.error("Username not found.");
  }
}

module.exports = {
  addStudyToMap,
  getStudies,
  updateStudy,
  getFriendStudies,
};
