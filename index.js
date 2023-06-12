import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js"; 
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: ".env" });


//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(cookieParser());

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSKEY,
  secretAccessKey: process.env.AWSPASSWORD,
  region: 'us-west-2'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mydbms',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
})

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.location);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(path.resolve(), 'client', 'build')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'), function (err) {
      if (err) {
        console.log(path.resolve(path.resolve(), 'client', 'build', 'index.html'));
        res.status(500).send(err);
      }
    });
  })
}

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log("API working!");
});
