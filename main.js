const express = require("express"),
  app = express(),
  port = 3000,
  sqlite3 = require("sqlite3").verbose(),
  db = new sqlite3.Database("notes.db"),
  moment = require("moment");

app.listen(port);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "6mb" }));
app.use(express.json({ limit: "6mb" }));

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
    db.each(
      `INSERT INTO main ("date","head","body") VALUES ("${time}","${data.header}", "${data.data}")`,
      (err, row) => {
        db.close();
      }
    );
  });
}
