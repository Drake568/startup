// studyService.js

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let studyMap = new Map();

function addStudyToMap(study) {
  if (!studyMap.has(study.associatedUser)) {
    studyMap.set(study.associatedUser, new Set([study]));
  } else {
    studyMap.get(study.associatedUser).add(study);
  }
}

function getStudies(username, shared = true) {
  const studiesSet = studyMap.get(username);

  if (studiesSet) {
    // Convert Set to array and optionally filter by shared
    const studiesArray = [...studiesSet].filter((study) =>
      shared ? true : !study.isPrivate
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
};
