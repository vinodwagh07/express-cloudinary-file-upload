const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const fileUploadRoutes = require("./routes/fileUploadRoutes");
const cloudinaryConnect = require("./config/cloudinary");
const dbConnect = require("./config/database");
require("dotenv").config();

//middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
); //Adds a req.files object to route handlers

//db & cloudinary connection
dbConnect();
cloudinaryConnect();

//mount routess
app.use("/api/v1/upload", fileUploadRoutes);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(process.env.PORT, () => {
  console.log("SERVERN IS STARTED");
});
