const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const Users = require("./Data/UsersData");

// initilize express
const app = express();
// define port
const PORT = process.env.PORT || 3333;

// middle ware for hbs view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// middle ware for bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// middler ware for static file rendering
app.use(express.static(path.join(__dirname, "public")));
//middleware for routers
app.use("/api/users", require("./routes/users"));

// routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Users App",
    Users,
  });
});

// listening port
app.listen(PORT, () =>
  console.log(`Server is Running on http://localhost:${PORT}`)
);
