const express = require("express");
const app = express();
const Joi = require("joi");
const path = require('path')
const { create } = require("express-handlebars");

const indexRouter = require("./routes/index");
const productRouter = require("./routes/addProduct");
const contactRouter = require("./routes/contact");
const addProductRouter = require("./routes/addProduct");

const exhbs = create({
  extname: "hbs",
  defaultLayout: "main",
});

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// View engine
app.engine("hbs", exhbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

//GET
app.use("/index", indexRouter);
app.use("/addProducts", productRouter);
app.use("/contact", contactRouter);
app.use("/", addProductRouter);

try {
  const port = normalizePort(process.env.port || 3001);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
}

function normalizePort(val) {
  let port = parseInt(val);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
