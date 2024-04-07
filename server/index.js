const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/full-mern-stack-video");

// Schema for Configurations
const ConfigSchema = new mongoose.Schema(
  {
    storageMethod: String,
  },
  { collection: "user-data" }
);
const Config = mongoose.model("Config", ConfigSchema);

app.get("/api/register", async (req, res) => {
  try {
    res.json({ status: "ok", znak: "Hello World" });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong email" });
  }
});

app.post("/login", async (req, res) => {
  try {
    await Config.create({
      storageMethod: req.body.name,
    });
    res.json({ status: "ok", token: "mockToken123" }); // Mock token
  } catch (err) {
    res.json({
      status: "error",
      error: "Something went wrong",
      error: err.message,
    });
  }
  // Mock login process
});

app.listen(1337, () => {
  console.log("Server started on 1337");
});
