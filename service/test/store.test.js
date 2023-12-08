test("that equal values are equal", () => {
  expect(false).toBe(false);
});

const request = require("supertest");
const app = require("../index.js");

const newStudy = {
  associatedUser: "asdf",
  note: "notesValue",
  links: ["links", "links2", "links3"],
  isPrivate: false,
};

test("Adds Study", async () => {
  const response = await request(app)
    .post("/api/addStudy")
    .send(newStudy)
    .expect(200);
});

test("Gets Study", async () => {
  const response = await request(app)
    .get("/api/getStudies/asdf")
    .expect(200)
    .expect((res) => {
      const receivedStudy = res.body[0]; // Assuming the response is an array of studies
      expect(receivedStudy.associatedUser).toBe(newStudy.associatedUser);
      expect(receivedStudy.note).toBe(newStudy.note);
      expect(receivedStudy.links).toEqual(newStudy.links);
      expect(receivedStudy.isPrivate).toBe(newStudy.isPrivate);
      // Check that the timestamp is within a reasonable range (e.g., within the last minute)
      const timestampDiff =
        Date.now() - new Date(receivedStudy.timestamp).getTime();
      expect(timestampDiff).toBeLessThan(60 * 1000); // 60 seconds
    });
});
