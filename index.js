const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const perPage = 10;
var response = {};

app.get("/", (req, res) => {
  let pageIndex = (req.query.page - 1).toString();

  fetch("https://toonittmedia.netlify.app/videos.json")
    .then((recv) => {
      return recv.json();
    })
    .then((data) => {
      let videos = data.videos; // array
      let indexes = [];
      let videoPages = {};
      videos.forEach((item, index) => {
        let videoIndex = Math.trunc(index / perPage + 1).toString();
        if (videoPages[videoIndex] === undefined) {
          indexes.push(videoIndex);
          videoPages[videoIndex] = [];
          videoPages[videoIndex].push(item);
        } else {
          videoPages[videoIndex].push(item);
        }
      });
      response = {
        pages: indexes,
        videos: videoPages[req.query.page],
      };
      res.json(response);
      console.log("Request Handled");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(3000, () => console.log("Example app is listening on port 3000."));