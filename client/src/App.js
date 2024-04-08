import React, { useState, useEffect } from "react";

function App() {
  const [loginCount, setLoginCount] = useState(0);
  const [storageMethod, setStorageMethod] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Fetch the storage method configuration from the backend on load
    fetch("http://localhost:1337/api/register")
      .then((res) => res.json())
      .then((data) => setStorageMethod(data.znak))
      .catch((err) => console.error("Failed to fetch config:", err));
  }, []);

  const handleRegister = () => {
    fetch("http://localhost:1337/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(false);
      });
  };

  const handleLogin = () => {
    setLoginCount((prevState) => prevState + 1);
    console.log(loginCount);
    if (localStorage.getItem("token") === "token123") {
      fetch("http://localhost:1337/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num: loginCount,
        }),
      });
    }
  };

  return (
    <div>
      <h1>
        Registrations{" "}
        <button onClick={handleRegister}>Click to register</button>
      </h1>
      <button disabled={isLoggedIn} onClick={handleLogin}>
        Login
      </button>
      <p>Login Count: {loginCount}</p>
      <h1> {storageMethod}</h1>
    </div>
  );
}

export default App;
