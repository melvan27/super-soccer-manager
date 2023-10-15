const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const seedRoles = require("./seeds/seedRoles");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
require("./config/mongoose.config");
const cookieParser = require("cookie-parser");
app.use(morgan("dev"))
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/user.routes")(app);
require("./routes/coach.routes")(app);
seedRoles();
app.listen(port, () => console.log(`Listening on port: ${port}`));
