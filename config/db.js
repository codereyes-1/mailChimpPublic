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
    


module.exports = connect
