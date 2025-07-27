const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.error(`❌ DATABASE CONNECTION FAILED: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
