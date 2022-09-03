const router = require("express").Router();
const send = require("../helpers/responseHandler");
const db = require("../config/db.config");
const axios = require("axios");

router.get("/api/incident_reports", async (req, res, next) => {
  try {
    const reports = await db
      .query(`SELECT * FROM incident_reports`)
      .then((payload) => {
        return payload.rows ?? [];
      });
    send(res, reports);
  } catch (error) {
    next(error);
  }
});

router.post("/api/incident_reports", async (req, res, next) => {
  const { client_id, incident_desc, city, country } = req.body;
  const date = new Date();
  var weather_report = {};

  try {
    weather_report = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.OWAPIKEY}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        var err = new Error(
          error.response.data.cod == "404"
            ? "Enter a valid location"
            : error.response.data.message
        );
        err.code = error.response.data.cod;
        throw err;
      });
    const newReport = await db
      .query(
        `INSERT INTO incident_reports(client_id, incident_desc, city, country, date, weather_report) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [client_id, incident_desc, city, country, date, weather_report]
      )
      .then((payload) => {
        return payload.rows[0];
      });
    send(res, newReport);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
