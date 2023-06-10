// Load Node modules
var express = require("express");
const ejs = require("ejs");
var path = require("path");
const PORT = process.env.PORT || 8080;
// Initialise Express
var app = express();
// Render static files
app.use(express.static("public"));
// Set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Port website will run on
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// Routes
app.get("*", (req, res) => {
  const currentPage = req.path;
  res.render("pages" + req.url, { currentPage });
});
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { currentPage: "home" });
});
app.get("/404", function (req, res, next) {
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});
app.get("/403", function (req, res, next) {
  // trigger a 403 error
  var err = new Error("not allowed!");
  err.status = 403;
  next(err);
});

app.get("/500", function (req, res, next) {
  // trigger a generic (500) error
  next(new Error("keyboard cat!"));
});

//Handle 404
app.use(function (req, res, next) {
  res.status(404);

  res.format({
    html: function () {
      res.render("pages/404", { url: req.url, currentPage: "404" });
    },
    json: function () {
      res.json({ error: "Not found" });
    },
    default: function () {
      res.type("txt").send("Not found");
    },
  });
});

//Handle 500
app.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render("pages/404", { error: err, currentPage: "500" });
});
