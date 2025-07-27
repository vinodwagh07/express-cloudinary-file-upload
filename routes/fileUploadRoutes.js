const express = require("express");
const router = express.Router();

const {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileUpload,
} = require("../controllers/fileUploadController");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/imageReducerUpload", imageReducerUpload);

module.exports = router;
