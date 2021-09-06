const cors = require("cors");
const express = require("express");
const gevolsData = require("./collections/gevols.json");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/g-evols/stats", function (_, res) {
  try {
    res.json(gevolsData);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

app.listen(4000, () => console.log(`Server is running on port ${4000}`));
