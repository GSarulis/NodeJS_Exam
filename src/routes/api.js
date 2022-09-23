"use strict";
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const { dbconfig } = require("../config");

// UŽduotis nr.2 POST metodas
router.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const con = await mysql.createConnection(dbconfig);
    const [data] = await con.execute(`
    INSERT INTO users (name, email, address)
      VALUES
      (
      ${mysql.escape(user.name)},
      ${mysql.escape(user.email)},
      ${mysql.escape(user.address)}
           )`);
    await con.end();
    return res.send(data);
  } catch (error) {
    return res.status(404).send({ error: `${error}` });
  }
});
//Užduotis nr.2.0
router.get("/users", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const responce = await con.execute("Select * From users_db.users;");

    res.send(responce[0]);
  } catch (error) {
    return res.status(404).send({ error: `${error}` });
  }
});

//Užduotis nr.2.1
router.get("/users/names", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute("Select id, name From users_db.users;");

    res.send(response[0]);
  } catch (error) {
    return res.status(404).send({ error: `${error}` });
  }
});
//Užduotis nr.2.2
router.get("/users/emails", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const responce = await con.execute(
      "Select id, name, email From users_db.users;"
    );

    res.send(responce[0]);
  } catch (error) {
    return res.status(404).send({ error: `${error}` });
  }
});
//Užduotis nr.2.3
router.get("/users/address", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const response = await con.execute(
      "Select id, name, address From users_db.users;"
    );

    res.send(response[0]);
  } catch (error) {
    return res.status(404).send({ error: `${error}` });
  }
});

module.exports = router;
