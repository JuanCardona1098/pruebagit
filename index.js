const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
let db;

app.use(express.json());
app.use(cors());


app.get("/api/1", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      email_address: { $regex: "@twitter.com" }
    })
    .limit(20)
    .toArray();
  res.send(result);
});

app.get("/api/2", async (req, res) => {
    const result = await db
      .collection("companies")
      .find({
        founded_year: { $gte: 2005, $lte: 2008 },
      })
      .limit(20)
      .toArray();
    res.send(result);
  });

mongoose
  .connect(
    "mongodb+srv://juan:hola@cluster0.ios47dj.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB Connected!");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
// .finally(()=>{
//   console.log("Request finished!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});