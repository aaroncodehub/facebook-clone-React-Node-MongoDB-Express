const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const GridsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const bodyParser = require("body-parser");
const path = require("path");
const Pusher = require("pusher");

const mongoPosts = require("./postsModel");

Grid.mongo = mongoose.mongo;

// pusher config , put it into .env in production
const pusher = new Pusher({
  appId: "1100558",
  key: "cdf43416aafbcf93fc2c",
  secret: "c9ff5d51c375a1a900a2",
  cluster: "ap4",
  useTLS: true
});

const app = express();
const port = process.env.PORT || 8000;

// middleware config
app.use(bodyParser.json());
app.use(cors());

// db config
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

// will put it into .env in production
const DB_CONNECT =
  "mongodb+srv://db-admin:DBadmin@cluster0.y2qlt.mongodb.net/facebook?retryWrites=true&w=majority";

// multiple connections for different databases, the default one is mongoose.connection

const conn = mongoose.createConnection(DB_CONNECT,options);
mongoose.connect(DB_CONNECT, options).catch(err => console.log(err));

mongoose.connection
  .once("open", () => {
  console.log('Default DB connected')
  const changeStream = mongoose.connection.collection('posts').watch()
  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      // trigger an event named INSERTED to channel named POSTS
      pusher.trigger('posts', 'inserted', {
        change: change
      })
    } else {
      console.log('Error triggering pusher')
    }
  })
  })
  .on('error', function (err) {
    console.log('connecting to MongoDB' + err)
  })
  ;


let gfs;
conn.once("open", () => {
  console.log("GFS DB connected");
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

//Multer adds a body object and a file or files object to the request object. 
//The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
const upload = multer({ storage });

app.get("/", (req, res) =>
  res.status(200).send("facebook server is up and running")
);

//req.file is the name of your file in the form
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
     return res.status(500).send(err)
    } else {
      data.sort((b,a) => {
        return a.timestamp - b.timestamp
      })
     return res.status(200).send(data)
    }
  })
})

// http://localhost:8000/retrieve/image/single?name=image-1604205138108.jpeg to get the image

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
