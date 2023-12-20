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
import { getAllLadles } from "./db/ladle.js";
import { getAllUsers } from "./db/user.js";
import moment from "moment";


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


app.get("/dashboard",requireAdminAuth, async (req, res) => {
    const ladles = await getAllLadles();
    const worker = await getAllUsers();

     // Filter ladles based on the difference between LastCheckDate and the current date
     const filteredLadles = ladles.filter((ladle) => {
         const lastCheckDate = moment(ladle.LastCheckDate);
         const currentDate = moment();

         // Calculate the difference in days
         // const differenceInDays = currentDate.diff(lastCheckDate, 'days');
         const differenceInDays = currentDate.diff(lastCheckDate, 'minutes');

         // Return ladles with a difference greater than or equal to 1 day
         return differenceInDays >= 1;
     });


    res.render("dashboard", {noWorker: worker.length, noLadle: ladles.length, noInspect: filteredLadles.length})
})

app.get("/oneLadle", requireAdminAuth,(req, res) => res.render("oneLadle"))
app.get("/alert", requireAdminAuth,getLadlesNeedInspection)
app.get("/halt", requireAdminAuth, (req, res) => res.render("halt"))
app.get("/statistics",requireAdminAuth,(req,res)=> res.render("statistics"))



// Auth route
app.use("/auth", authRouter);

// Ladels route
app.use("/ladles",requireAdminAuth, ladleRouter);

// Frame route
app.use("/frames",requireAdminAuth, frameRouter);

// Admin route
// app.use("/admin", adminRouter);


app.listen(port, console.log(`Listening on port ${port}`));
