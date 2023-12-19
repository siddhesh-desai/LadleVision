import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ladleRouter from "./routes/ladles.js"
import frameRouter from "./routes/frame.js"
import authRouter from "./routes/auth.js"
import { requireAdminAuth, requireUserAuth } from "./middleware/auth.js";
import adminRouter from "./routes/admin.js";
import { getLadlesNeedInspection } from "./controller/ladle.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//setting view engine to ejs
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => res.render("home"))
app.get("/login", (req, res) => res.render("login", {message: null}))
app.get("/register", (req, res) => res.render("register", {message: null}))

app.get("/protected", requireAdminAuth, (req, res) => res.render("protected"))

app.get("/dashboard",requireAdminAuth,(req, res) => res.render("dashboard"))

app.get("/oneLadle", requireAdminAuth,(req, res) => res.render("oneLadle"))
app.get("/alert", requireAdminAuth,getLadlesNeedInspection)


// Auth route
app.use("/auth", authRouter);

// Ladels route
app.use("/ladles", ladleRouter);

// Frame route
app.use("/frames", frameRouter);

// Admin route
app.use("/admin", adminRouter);


app.listen(port, console.log(`Listening on port ${port}`));
