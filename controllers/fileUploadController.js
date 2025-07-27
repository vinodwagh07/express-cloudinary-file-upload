const cloudinary = require("cloudinary").v2;
const File = require("../models/File");
const path = require("path");

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const imagefile = req.files.file;

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = imagefile.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not suupported",
      });
    }

    const response = await uploadFileToCloudinary(imagefile, "fileUploadApp");

    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      data: fileData,
      message: "Image Uploaded Successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const videofile = req.files.file;
    console.log(req.files.file.tempFilePath);
    console.log(path.resolve(req.files.file.tempFilePath));

    const supportedTypes = ["mp4", "mov"];

    const fileType = videofile.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not suupported",
      });
    }

    const response = await uploadFileToCloudinary(videofile, "fileUploadApp");

    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      data: fileData,
      message: "Video Uploaded Successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const imagefile = req.files.file;

    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = imagefile.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not suupported",
      });
    }

    const response = await uploadFileToCloudinary(
      imagefile,
      "fileUploadApp",
      40
    );

    const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
    });

    res.status(200).json({
      success: true,
      data: fileData,
      message: "Image Uploaded Successfully with reduced size...",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file; // Fetch file
    const fileType = file.name.split(".")[1];

    let path = __dirname + "/uploads/" + Date.now() + "." + fileType;

    file.mv(path, (err) => {
      if (err) {
        return res.status(500).send("File upload failed");
      }

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully...",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error...",
    });
  }
};
