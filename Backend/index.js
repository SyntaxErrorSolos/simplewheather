const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.listen(3001);
const apiratelimit = require("express-rate-limit");
const limiter = apiratelimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

const apiKeyLocate = require("./config.json");
const apiKey = apiKeyLocate.API;

//main
app.get("/senpai", async (req, res) => {
  res.send("hey senpai ;)");
});

app.get("/wheather", async (req, res) => {
  const lat = req.get("lat");
  const long = req.get("long");

  if (!lat) return res.send("No lat");
  if (!long) return res.send("No long");

  const sendreq = fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`,
    { method: "get" }
  );

  sendreq
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.get("/wheathercity", async (req, res) => {
  const city = req.get("city");

  if (!city) return res.json("No City given!");

  const sendreq = fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    { method: "get" }
  );

  sendreq
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
