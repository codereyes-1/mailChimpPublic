const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const { Console } = require("console");
const mongoose = require("mongoose");
// const { restart } = require("nodemon");
// code nodejs module to deal with file paths

const app = express();


const connectionString = "mongodb+srv://m001-student:m001-password@sandbox.7wsam.mongodb.net/fourthwall?retryWrites=true&w=majority"

// const connection = mongoose.connect(connectionString)

// const connectionString = "mongodb+srv://m001-student:m001-password@sandbox.7wsam.mongodb.net/fourthwall?retryWrites=true&w=majority"


// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// const connect = async () => {
//   try {
//     await mongoose.connect(connectionString)
//     console.log('MongoDB Connected...')
//   } catch (err) {
//     console.log(err.message)
//     // exit process with failure
//     process.exit(1)
//   }
// }

// Create a schema for the data you want to save in MongoDB
const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  image: Buffer,
});


// Create a model based on the schema
const FormData = mongoose.model("requests", formDataSchema);





// Bodyparser Middleware .urlencoded Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public")));

app.get("/favicon.ico", (req, res) => {
    res.redirect("/index.html");
});


// Signup Route /signup - req,res as parameters - get data in the form
// Here will log extended form of req.body as json, display 'hello' in resonse on page
app.post("/signup", (req, res) => {
  //   Get all form data into variable req.body
  const { firstName, lastName, email, image } = req.body;

  //   Check that all fields are filled
  if (!firstName || !lastName || !email || !image) {
    res.redirect("/fail.html");
    return;
  }

  //   Construct request data per API format w/members array, mergre fields
  const data = {
    members: [
      {
        email_address: email,
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        image_file: image
      },
    ],
  };

  //   Stringify the data

  
  const postData = JSON.stringify(data);
  const formData = new FormData();
  formData.firstName = firstName;
  formData.lastName = lastName;
  formData.email = email;
  formData.image = fs.readFileSync(newPath);
  formData.save();


// // Set all options
//   const options = {
//     url: "https://us13.api.mailchimp.com/3.0/lists/a1204496a9",
//     method: "POST",
//     // API key in header
//     headers: {
//       Authorization: "auth 3b6bff77fa5af57dfa83cd5350bb60e0-us13-us13",
//     },
//     // postData as payload
//     body: postData,
//   };

  // Request with options and callback to handle response
  // Check for error, send to fail. If not fail, check response code is 200, redir > 200. If not, redir to fail
  request(options, (err, response, body) => {
    if (err) {
      res.redirect("/fail.html");
    } else {
      if (response.statusCode === 200) {
        postData.save();
        res.redirect("/success.html");
      }
    }
  });
});

//  public folder where html files served from

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));







// const express = require("express");
// const request = require("request");
// const bodyParser = require("body-parser");
// const path = require("path");
// const formidable = require("formidable");
// const fs = require("fs");
// const mongoose = require("mongoose");

// const app = express();

// // Bodyparser Middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/favicon.ico", (req, res) => {
//   res.redirect("/index.html");
// });

// // Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://m001-student:m001-password@sandbox.7wsam.mongodb.net/partyHouse?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Create a schema for the data you want to save in MongoDB
// const formDataSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   image: String,
// });

// // Create a model based on the schema
// const FormData = mongoose.model("FormData", formDataSchema);

// app.post("/signup", async (req, res) => {
//   const form = formidable({ multiples: false });

//   try {
//     const { firstName, lastName, email } = req.body;

//     // Get the uploaded image file
//     const imageFile = req.files?.image;

//     // Check that all fields are filled
//     if (!firstName || !lastName || !email || !imageFile) {
//       res.redirect("/fail.html");
//       return;
//     }

//     // Move the uploaded image file to a designated folder
//     const newPath = path.join(__dirname, "public", "uploads", imageFile.name);
//     fs.renameSync(imageFile.path, newPath);

//     // Construct request data per API format with image file path added
//     const data = {
//       members: [
//         {
//           email_address: email,
//           status: "subscribed",
//           merge_fields: {
//             FNAME: firstName,
//             LNAME: lastName,
//             IMAGE: newPath, // Store the image file path in a merge field
//           },
//         },
//       ],
//     };

//     // Save form data to MongoDB
//     const formData = new FormData({
//       firstName,
//       lastName,
//       email,
//       image: newPath,
//     });
//     await formData.save();

//     // Send data to Mailchimp API
//     const postData = JSON.stringify(data);
//     const options = {
//       url: "https://us13.api.mailchimp.com/3.0/lists/a1204496a9",
//       method: "POST",
//       headers: {
//         Authorization: "auth 3b6bff77fa5af57dfa83cd5350bb60e0-us13-us13",
//       },
//       body: postData,
//     };

//     request(options, (err, response, body) => {
//       if (err) {
//         res.redirect("/fail.html");
//       } else {
//         if (response.statusCode === 200) {
//           res.redirect("/success.html");
//         } else {
//           res.redirect("/fail.html");
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.redirect("/fail.html");
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on ${PORT}`));
