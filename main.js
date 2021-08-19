const express = require("express"),
  app = express(),
  port = 3000,
  sqlite3 = require("sqlite3").verbose(),
  db = new sqlite3.Database("notes.db"),
  fs = require("fs");
  moment = require("moment");
fs.openSync("notes.db","a+");
app.listen(port);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.sendFile("index");
});

app.post("/", (req, res) => {
  addDataOnDB(req.body);
  res.redirect("url:/");
});

function addDataOnDB(data) {
  let time = moment().format("DD-MM-YYYY; HH:mm:ss");
  console.log("OK! " + time);
  db.serialize(function () {
    db.run(
      `CREATE TABLE IF NOT EXISTS "main" (
        "date"	TEXT(35),
        "head"	TEXT,
        "body"	TEXT
      );`
    )
    db.each(
      `INSERT INTO main ("date","head","body") 
      VALUES 
      ("${time}","${data.header}", "${data.data}")`
      );
  });
}
