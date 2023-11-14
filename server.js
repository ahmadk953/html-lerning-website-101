// Load Node modules
let express = require("express");
const ejs = require("ejs");
let path = require("path");
const PORT = process.env.PORT || 8080;
const validator = require("validator");
// Initialise Express
let app1 = express();
//Remove the x-powered-by from the request headers
app1.disable("x-powered-by");
// Render static files
app1.use(express.static("public"));
// Set the view engine to ejs
app1.set("views", path.join(__dirname, "views"));
app1.set("view engine", "ejs");
// Port website will run on
app1.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// Routes
app1.get("*", (req, res) => {
  const currentPage = validator.blacklist(req.path, "<>\"'()&*#%$");
  console.log("currentPage:", currentPage);
  res.render("pages" + currentPage, { currentPage });
});
app1.get("/", function (req, res) {
  res.render("pages/index.ejs", { currentPage: "home" });
});
app1.get("/404", function (req, res, next) {
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});
app1.get("/403", function (req, res, next) {
  // trigger a 403 error
  const err = new Error("not allowed!");
  err.status = 403;
  next(err);
});

app1.get("/500", function (req, res, next) {
  // trigger a generic (500) error
  next(new Error("keyboard cat!"));
});

//Handle 404
app1.use(function (req, res, next) {
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
app1.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) app1ropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render("pages/404", { error: err, currentPage: "500" });
});
