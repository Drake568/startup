// studyService.js

const DB = require("../database.js");

let studyMap = new Map();

async function addStudyToMap(data) {
  const studyData = data.study;

  let username = studyData.associatedUser;
  if (!studyMap.has(username)) {
    studyMap.set(username, new Set([studyData]));
  } else {
    studyMap.get(username).add(studyData);
  }

  try {
    // Save the study to the database
    await DB.addStudy(studyData);
    console.log("Study saved to the database.");
  } catch (error) {
    console.error("Error saving study to the database:", error);
  }
}

function getStudies(username, shared = true) {
  const studiesSet = studyMap.get(username);
  if (!studiesSet) {
    return [];
  }
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
