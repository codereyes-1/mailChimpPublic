const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')


// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(db)
        console.log("MongoDB Connected...")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
    




//     mongoose.connect(db, {
//     useNewUrlParser: true, useUnifiedTopology: true
// })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));


module.exports = connect