const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// activate CORS
app.use(cors());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(
    dbConfig.url,
    {
      useNewUrlParser: true,
      useFindAndModify:true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "EasyRecruit Questions handler " });
});

require("./routes/question.routes.js")(app);



// Listen for requests
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
