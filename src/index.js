"use strict";
const express = require("express");
const cors = require("cors");
const fill = require("./routes/fill");
const api = require("./routes/api");
const { port } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", fill);
app.use("/api", api);

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
