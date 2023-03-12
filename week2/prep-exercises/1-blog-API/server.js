const express = require("express");
const app = express();

const fs = require("fs");

app.use(express.json());

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(`${title}.txt`, content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;
  console.log(req.params)
  if (fs.existsSync(`${title}.txt`)) {
    fs.writeFileSync(`${title}.txt`, content);
    res.end("ok");
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const {title} = req.params;
  const isBlogPostExist = fs.existsSync(title);
  if (isBlogPostExist) {
    fs.unlinkSync(`${title}.txt`);
    res.status(200);
    res.end("ok");
  } else {
    res.status(404).send("Blog post not found.");
    res.end(Blog post not found.)
  }
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(`${title}.txt`)) {
    const post = fs.readFileSync(`${title}.txt`);
    res.send(post);
  } else {
    res.status(404).send("Blog post not found.");
  }
});

//YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
