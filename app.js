
const express = require("express");
const path = require("path");
const connect = require('./config/db')
const mongoose = require("mongoose");
const formDataSchema = require("./models/formModel");

const app = express();
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connect();
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req, res) => {
  res.redirect("/index.html");
});


app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, image } = req.body;
  console.log(req.body)
  const FormData = mongoose.model("FormData", formDataSchema);
  // Check that all fields are filled
    if (!firstName || !lastName || !email || !image ) {
      res.redirect("/fail.html");
      return;
    }
  
  const formData = new FormData({
    firstName,
    lastName,
    email,
    image
  });
  
  
  try {
    const savedData = await formData.save();
    console.log(savedData);
    res.redirect('/success.html');
  } catch (error) {
    console.error(error);
    res.redirect('/fail.html');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));
