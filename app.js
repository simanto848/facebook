const express = require('express');
const fileUpload = require("express-fileupload")
const session = require("express-session")
const logger = require("morgan")
const flash = require("connect-flash")
const path = require("path")
const hbs = require("hbs")
const app = express();
require("dotenv").config()
const routes = require("./routes/index")
require("./app/models/index")

// ---------- View Engine Setup -----------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// --------- Register Partials ----------
hbs.registerPartials(__dirname + "/views/partials")

// ------- Static Files --------
app.use(express.static(path.join(__dirname, "public")))

// ------- Session -------
app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    }
}))

// --------- Middlewares ---------
app.use(logger('dev'));
app.use(fileUpload())
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// -------- Routes -------
app.use("/", routes)

// ------ Server -------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})