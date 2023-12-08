import React from "react";
import { useNavigate } from "react-router";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import "../css/register.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const isMissing = (value: string) => value === "";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  function register() {
    fetch("/api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        friends: [],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log registration response
        toast.success("Registration successful!");
        localStorage.setItem("username", username || "");
        localStorage.setItem("friends", JSON.stringify([]));
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error("Registration failed");
      });
  }

  return (
    <main>
      <body>
        <div className="register-container">
          <header className="register-header">
            <h1>SmallPlates</h1>
          </header>
          <main>
            <h1>Register</h1>
            <form id="registerForm">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  id="username"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  type="password"
                  id="confirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  error={confirmPassword != "" && password !== confirmPassword}
                  value={confirmPassword}
                />
              </div>
              <div className="register-button-container">
                <Button
                  type="button"
                  onClick={register}
                  disabled={
                    isMissing(username) ||
                    isMissing(password) ||
                    isMissing(email) ||
                    isMissing(confirmPassword)
                  }
                >
                  Register
                </Button>
              </div>
              <div className="register-button-container">
                <p>
                  <a href="login">Back to login</a>
                </p>
              </div>
            </form>
          </main>
        </div>
      </body>
    </main>
  );
}
