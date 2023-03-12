import express from "express";
import API_KEY from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.use(express.json());

app.post("/weather", (req, res) async => {

  try{
   const respond= await fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${API_KEY}}`);
  }catch(error){
    console.log(error)
  }
});

app.listen(PORT, () => console.log(`server is listening now port ${PORT}`));


// app.post("/weather", (req, res) => {
//   const cityName = req.body.cityName;
//   res.set("Content-Type", "application/json");
//   res.send(`You submitted: ${cityName}`);
// });