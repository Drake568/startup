import React from "react";
import { useNavigate } from "react-router";
import "../css/login.css";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { Toast } from "react-bootstrap";
import { toast } from "react-toastify";

const isMissing = (value: string) => value === "";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = React.useState("");

  function login() {
    if (!verifyCredentials()) {
      return;
    }
  }

  async function verifyCredentials(): Promise<boolean> {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsername(username);
      localStorage.setItem("friends", JSON.stringify(data.friends));
      navigate("/home");

      return true;
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid credentials");
      return false;
    }
  }

  async function getRandomVerse() {
    try {
      const verse = await fetch(
        "https://labs.bible.org/api/?passage=votd&type=text&formatting=plain"
      ).then((response) => response.text());

      localStorage.setItem("randomVerse", verse);
    } catch (error) {
      console.error("Error while fetching random verse:", error);
    }
  }

  // Initial call
  getRandomVerse();

  return (
    <main>
      <div>
        <body>
          <div className="login-container">
            <header className="login-header">
              <h1>SmallPlates</h1>
            </header>
            <main>
              <h1>Sign in</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    id="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </div>
                <div className="login-button-container">
                  <Button
                    onClick={login}
                    disabled={isMissing(password) || isMissing(username)}
                  >
                    Sign in
                  </Button>
                </div>
                <div className="login-button-container">
                  <p>
                    {"Not registered? "}
                    <a href="register">{"Register here"}</a>
                  </p>
                </div>
              </form>
            </main>

            <footer>
              <hr />
              <span className="text-reset">Jacob Drake</span>
              <a href="https://github.com/Drake568/startup">GitHub</a>
            </footer>
          </div>
        </body>
      </div>
    </main>
  );
}
