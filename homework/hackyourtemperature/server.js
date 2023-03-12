import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", async (req, res) => {
  const { city } = req.body;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  console.log(data);
  
  if (data.cod === "404") {
    res.send({ weatherText: "City is not found!" });
  } else {
    const { name: cityName} = data;
    const {main:{temp}} = data;
    res.send({ weatherText: `The temperature in ${cityName} is ${temp}.` });
  }
});


app.listen(PORT, () => console.log(`server is listening now port ${PORT}`));

// app.post("/weather", (req, res) => {
//   const cityName = req.body.cityName;
//   res.set("Content-Type", "application/json");
//   res.send(`You submitted: ${cityName}`);
// });
