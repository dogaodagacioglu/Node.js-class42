import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { city } = req.body;
  if (!city) {
    res.status(400);
    res.send({ weatherText: "City is not found!" });
  } else {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data.cod === "404") {
      res.status(404);
      res.send({ weatherText: "İnvalid city" });
    } else {
      const cityName = data.name;
      const temp = data.main.temp;
      res.send({ weatherText: `The temperature in ${cityName} is ${temp} C.` });
    }
  }
});

export default app;
