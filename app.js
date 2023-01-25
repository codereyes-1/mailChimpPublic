const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const { Console } = require("console");
// const { restart } = require("nodemon");
// code nodejs module to deal with file paths

const app = express();

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
  const { firstName, lastName, email } = req.body;

  //   Check that all fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect("/fail.html");
    return;
  }

  //   Construct request data per API format w/members array, mergre fields
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  //   Stringify the data

  const postData = JSON.stringify(data);

  // Set all options
  const options = {
    url: "https://us13.api.mailchimp.com/3.0/lists/a1204496a9",
    method: "POST",
    // API key in header
    headers: {
      Authorization: "auth ",
    },
    // postData as payload
    body: postData,
  };

  // Request with options and callback to handle response
  // Check for error, send to fail. If not fail, check response code is 200, redir > 200. If not, redir to fail
  request(options, (err, response, body) => {
    if (err) {
      res.redirect("/fail.html");
    } else {
      if (response.statusCode === 200) {
        res.redirect("/success.html");
      } else {
        res.redirect("/fail.html");
      }
    }
  });
});

//  public folder where html files served from

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
