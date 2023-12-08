class Study {
  constructor(associatedUser, note, links, isPrivate, timestamp) {
    this.associatedUser = associatedUser;
    this.note = note;
    this.links = links;
    this.isPrivate = isPrivate;
    this.timestamp = timestamp || new Date(); // Use current date/time if not provided
  }
}
