const express = require("express");
const hbs = require("hbs");
const axios = require("axios");

const app = express();
const port = 3000;


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");


app.get("/", (req, res) => {
  res.send("Hello, Express!");
});


app.get("/login", (req, res) => {
  res.send("Login page");
});


app.get("/weather", (req, res) => {
  res.render("weather");
});


app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const apiKey = "618c41dda24c6595438c5a8eb0956332";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const temperature = response.data.main.temp;
    res.send(`Temperature in ${city}: ${temperature}°K`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});


app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const apiKey = "618c41dda24c6595438c5a8eb0956332";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const temperature = response.data.main.temp;
    res.send(`Temperature in ${city}: ${temperature}°K`);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});


app.get("/weather/current-location", async (req, res) => {
  try {

    res.send("Weather information for current location");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
