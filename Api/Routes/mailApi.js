const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// wrap async function
router.post("/", async (req, res) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:"testforhamza@gmail.com", 
        pass: "Hamza123", // 
      },
    });

    // send mail with text
    const mailtext = await transporter.sendMail({
      from: '" Hatem" <testforhamza@gmail.com>', // sender address
      to: "testforhamza@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello Hamza again ", // plain text body
      html: "<h1> Hello Hamza </h1>", // html body
    });
    res.json({message : " mail sent successfully ."} )
  } catch {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});
module.exports=router ; 
