import React, { useState, useEffect } from "react";

function App() {
  const [loginCount, setLoginCount] = useState(0);
  const [storageMethod, setStorageMethod] = useState("");

  useEffect(() => {
    // Fetch the storage method configuration from the backend on load
    fetch("http://localhost:1337/api/register")
      .then((res) => res.json())
      .then((data) => setStorageMethod(data.znak))
      .catch((err) => console.error("Failed to fetch config:", err));
  }, []);

  const handleLogin = () => {
    fetch("http://localhost:1337/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "nesto",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
      });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <p>Login Count: {loginCount}</p>
      <h1> {storageMethod}</h1>
    </div>
  );
}

export default App;
