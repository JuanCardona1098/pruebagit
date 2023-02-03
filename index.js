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

  // Ejercicio/03 - API que muestra la info de compañia Technorati
app.get("/api/3", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({ name: /Technorati/ })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/04 - API que muestra las compañias con categoria advertising y fundadas en 2002
app.get("/api/4", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      $and: [{ category_code: /advertising/ }, { founded_year: { $eq: 2002 } }],
    })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/05 - API que muestra las compañias con categoria games_video o messaging
app.get("/api/5", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      $or: [{ category_code: /messaging/ }, { category_code: /games_video/ }],
    })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/06 - API que muestra  por parametros URL  las compañías cuyo año de fundación sea 2006	
app.get("/api/6", async (req, res) => {
  try {
    console.log(req.query);
    const founded_year = parseInt(req.query.founded_year);

    const result = await db
      .collection("companies")
      .find({
        founded_year,
      })
      .limit(5)
      .toArray();

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

// Ejercicio/07 - API que muestra por medio del body  las compañías cuyo año de fundación sea 2006
app.post("/api/7", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db
      .collection("companies")
      .find(req.body)
      .limit(5)
      .toArray();

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
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