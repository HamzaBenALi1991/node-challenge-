const express = require("express");
const router = express.Router();
// multer
const multer = require("multer");
// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
// file filter
const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const Files = require("../models/filemodel");

// post file or image

router.post("/", upload.single("files"), async (req, res) => {
  try {
    const file = await Files.create({ image: req.file.path });
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({
      message: "internal serveur problem ",
      error: error.message,
    });
  }
});
// get file router
router.get("/", async (req, res) => {
  try {
    const files = await Files.find({});
    res.status(200).json({
        image : files.map(file =>{
            return{
                filename : file.image,
            }
        })
    })
  } catch {}
});
module.exports = router;
