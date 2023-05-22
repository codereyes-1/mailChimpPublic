const mongoose = require('mongoose')

// Create a schema for the data you want to save in MongoDB
const formDataSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  image: {
    type: Buffer,
    // required: true
  }
});

module.exports = formDataSchema;
