const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

require("./src/config/dotenv.config.js");
const errorHandler = require("./src/middlewares/errorHandler");
const corsOptions = require("./src/config/cors.config");
const send = require("./src/helpers/responseHandler");
const routes = require("./src/routes/all.route");
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(routes);

app.get("/", (req, res) => {
  send(res, "Server Running");
});

app.use(errorHandler); // error handler middleware

app.listen(process.env.PORT || 5000, (_) => {
  console.log(`App running on ${process.env.PORT || "5000"}`);
});
