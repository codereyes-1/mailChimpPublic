// // const express = require("express");
// // // const request = require("request");
// // const bodyParser = require("body-parser");
// // const path = require("path");
// // const { Console } = require("console");
// // const mongoose = require("mongoose");
// // const formModel = require("./models/formModel")
// // const connect = require('./config/db')
// // // const { restart } = require("nodemon");
// // // code nodejs module to deal with file paths

// // const app = express();

// // connect()
// // // Bodyparser Middleware .urlencoded Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
// // app.use(bodyParser.urlencoded({ extended: true }));
// // // app.use(bodyParser.json())

// // // Static folder
// // app.use(express.static(path.join(__dirname, "public")));
// // // app.use(express.static("public")));

// // app.get("/favicon.ico", (req, res) => {
// //     res.redirect("/index.html");
// // });



// // const FormData =mongoose.model("formModel", formModel)

// // // Signup Route /signup - req,res as parameters - get data in the form
// // // Here will log extended form of req.body as json, display 'hello' in resonse on page
// // app.post("/signup", async (req, res) => {
// //   //   Get all form data into variable req.body
// //   const { firstName, lastName, email } = req.body;
// //   console.log(req.body)

// //   //   Check that all fields are filled
// //   // if (!firstName || !lastName || !email) {
// //   //   res.redirect("/fail.html");
// //   //   return;
// //   // }

// //     // Construct request data per API format w/members array, mergre fields
// //   // const formData = new FormData({
// //   //   firstName,
// //   //   lastName,
// //   //   email
// //   // })

// //   // const formData = {
// //   //       email_address: email,
// //   //       FNAME: firstName,
// //   //       LNAME: lastName,
// //   //       // image_file: image
// //   // };
// //   // console.log(formData)

// //   const formData = new FormData({
// //     firstName,
// //     lastName,
// //     email
// //   });

// //   try {
// //     const savedData = await formData.save()
// //     console.log(savedData)
// //     res.redirect('/success.html')
// //   } catch (error) {
// //     console.error(error)
// //     res.redirect('/fail.html')
// //   }
// // });


// // //  public folder where html files served from

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, console.log(`Server started on ${PORT}`));




// app.js
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