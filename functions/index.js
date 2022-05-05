const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {default: axios} = require("axios");

const PORT = 3002;

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true}));

app.get("/get/location/:lattlong", (req, res)=>{
  try {
    axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${req.params.lattlong}`)
        .then((response) => {
          return res.send(response.data);
        })
        .catch((err) => {
          return res.sendStatus(err.status ? err.status : 500).send(err);
        });
  } catch (error) {
    return res.sendStatus(error.status ? error.status : 500).send(error);
  }
});

app.get("/get/weather/:woeid", (req, res)=>{
  try {
    const weather = axios.get(`https://www.metaweather.com/api/location/${req.params.woeid}/`);
    return res.send(weather.data);
  } catch (error) {
    return res.status(error.status ? error.status : 500).send(error);
  }
});

app.get("/get/country/:query", (req, res)=>{
  try {
    const countrys = axios.get(`https://www.metaweather.com/api/location/search/?query=${req.params.query}`);
    return res.send(countrys.data);
  } catch (error) {
    return res.status(error.status ? error.status : 500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`vivo desde ${PORT}`);
});

exports.app = functions.https.onRequest(app);
