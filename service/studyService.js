// studyService.js

const DB = require("../database.js");

async function saveStudy(data) {
  const studyData = data.study;
  try {
    await DB.addStudy(studyData);
    console.log("Study saved to the database.");
  } catch (error) {
    console.error("Error saving study to the database:", error);
  }
}

// function getStudies(username, friend) {

// }

async function getStudies(username) {
  try {
    const studies = await DB.getStudies(username);
    console.log("Studies retrieved from the database.");
    return studies;
  } catch (error) {
    console.error("Error retrieving studies from the database:", error);
    return undefined;
  }
}

async function getFriendStudies(username) {
  try {
    const studies = await DB.getFriendStudies(username);
    console.log("Friend studies retrieved from the database.");
    return studies;
  } catch (error) {
    console.error("Error retrieving friend studies from the database:", error);
    return undefined;
  }
}

async function updateStudy(username, studyId, newNote, newLinks) {
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
  addStudyToMap: saveStudy,
  getStudies,
  updateStudy,
  getFriendStudies,
};
