function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!verifyCredentials(username, password)) {
    alert("Invalid credentials");
    return;
  }
  window.location.href = "home.html";
}

function verifyCredentials(username, password) {
  return true;
}

//seed data

localStorage.setItem("username", "JacobD");
localStorage.setItem("name", "Jacob Drake");

const users = [
  { username: "JacobD", name: "Jacob Drake" },
  { username: "jd1", name: "Jacob One" },
  { username: "jd2", name: "Jacob Two" },
  { username: "jd3", name: "Jacob Three" },
  { username: "jd4", name: "Jacob Four" },
];

localStorage.setItem("users", JSON.stringify(users));

const friends = ["jd1"];

localStorage.setItem("friends", JSON.stringify(friends));

const friendRequests = ["jd2", "jd3"];

localStorage.setItem("friend-requests", JSON.stringify(friendRequests));

const study1 = {
  notes: "Study 1",
  links: [
    "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/1?lang=eng",
  ],
};

localStorage.setItem("JacobD-study-1698556679193", JSON.stringify(study1));

const study2 = {
  notes: "jd2-study-1698536763299",
  links: [
    "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/2?lang=eng",
  ],
};

localStorage.setItem("jd2-1698536763299", JSON.stringify(study2));

const study3 = {
  notes: "jd1-study-1698556679193",
  links: [
    "https://www.churchofjesuschrist.org/study/scriptures/nt/matt/3?lang=eng",
  ],
};

localStorage.setItem("jd1-study-1698556679193", JSON.stringify(study3));
