const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/BGMI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("✅ MongoDB connected");
});

// POST data to a collection
app.post("/tournament", async (req, res) => {
  const { collection, data } = req.body;

  if (!collection || !Array.isArray(data)) {
    return res.status(400).send("❌ Invalid request format.");
  }

  try {
    const targetCollection = db.collection(collection);
    await targetCollection.insertMany(data);
    res.status(201).send("✅ Data saved successfully.");
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).send("❌ Failed to save data.");
  }
});

// GET tournaments (default collection)
app.get("/tournament", async (req, res) => {
  try {
    const tournaments = await db.collection("tournament").find({}).toArray();
    res.json(tournaments);
  } catch (err) {
    console.error("❌ Error fetching tournaments:", err);
    res.status(500).send("❌ Failed to fetch tournaments.");
  }
});
app.get("/mvpplayer", async (req, res) => {
  try {
    const tournaments = await db.collection("mvpplayer").find({}).toArray();
    res.json(tournaments);
  } catch (err) {
    console.error("❌ Error fetching mvpplayer:", err);
    res.status(500).send("❌ Failed to fetch mvpplayer.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
