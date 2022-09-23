"use strict";
const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();
const fetch = require("node-fetch");

const { dbconfig } = require("../config");

router.get("/fill", async (req, res) => {
  try {
    const users = await fetch("https://jsonplaceholder.typicode.com/users"); // fetching data
    const response = await users.json(); // Data format
    const con = await mysql.createConnection(dbconfig); // Make connection to data base

    response.forEach(async (user) => {
      const address = `${user.address.street} ${user.address.city}`;

      await con.execute(`INSERT INTO users (name, email, address)
      VALUES
      (
      ${mysql.escape(user.name)},
      ${mysql.escape(user.email)},
      ${mysql.escape(address)}
           )`);
    });

    res.send("Success");
    await con.end;
  } catch (event) {
    console.log(event);
    res.status(400).send({ error: `Error` });
  }
});

module.exports = router;
