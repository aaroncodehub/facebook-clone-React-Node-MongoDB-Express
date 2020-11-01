const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const GridsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const path = require("path");
const Pubsher = require("pusher");

const mongoPosts = require("./mongoPosts");

Grid.mongo = mongoose.mongo;

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

const DB_CONNECT =
  "mongodb+srv://db-admin:DBadmin@cluster0.y2qlt.mongodb.net/facebook?retryWrites=true&w=majority";
const conn = mongoose.createConnection(DB_CONNECT, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connect(DB_CONNECT, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("db connected"));

let gfs;
conn.once("open", () => {
  console.log("DB connected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

const storage = new GridsStorage({
  url: DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename,
        bucketName: "images",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

app.get("/", (req, res) =>
  res.status(200).send("facebook server is up and running")
);

app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});

app.post("/upload/post", (req, res) => {
  const dbPost = req.body;
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get('/retrieve/posts', (req,res) => {
  mongoPosts.find((err,data) =>{
    if(err) {
      res.status(500).send(err)
    } else {
      data.sort((b,a) => {
        return a.timestamp - b.timestamp
      })
      res.status(200).send(data)
    }
  })
})

app.get("/retrieve/image/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});
app.listen(port, () =>
  console.log(`facebook server is up and running on ${port}`)
);
