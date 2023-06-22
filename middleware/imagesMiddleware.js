const multer = require("multer");
const path = require("path");
const pathToImages = path.resolve(__dirname, "../images");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dkbronwmi",
  api_key: "241918562481811",
  api_secret: "1bZMy9R27jR_K_zHXwLiuExBBwU",
});

const Storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: Storage });

module.exports = { upload };
