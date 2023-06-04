require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.error("DB connection error!");
    process.exit(1);
  }
  console.log("DB Connected ...");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App is running on ${port}...`));
