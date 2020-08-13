const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get("/main", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render("index", { dataList: files });
  });
});
app.get("/main/:item", (req, res) => {
  const title = req.params.item;
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    fs.readFile(`data/${title}`, (err, data) => {
      if (err) throw err;
      res.render("index", { dataList: files, title: title, description: data });
    });
  });
});
app.post("/main", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile(`data/${title}.txt`, description, (err) => {
    if (err) throw err;

    fs.readdir("data", (err, files) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
      res.render("index", {
        title: title,
        description: description,
        dataList: files,
      });
    });
  });
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
