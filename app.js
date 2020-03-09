var express     = require("express")
    app         = express()
    bodyParser  = require("body-parser")
    mongoose    = require("mongoose")
    passport    = require("passport")
    LclStrategy = require("passport-local")
    Campground  = require("./models/campground")
    seedDB      = require("./seeds")
    Comment     = require("./models/comment")
    User        = require("./models/user")
    mthdOveride = require("method-override")
    flash       = require("connect-flash")

var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/database", {useNewUrlParser: true,  useUnifiedTopology: true}, function() {
    console.log("MongoDB Connected")
});
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true})) //used to support body parser which helps in transforming data from form to req.body 
app.use(mthdOveride("_method"))
app.use(flash())


//----PASSPORT CONFIG--------
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LclStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//-----------------------------
app.use(function(req, res, next){             
    res.locals.currentUser = req.user // currentUser is variable to pass in EVERY routes! req.user stores information about the logged in user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

app.use(indexRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

//-------------LISTEN ON PORT 5000--------------
app.listen(5000, function() {
    console.log("server is running at http://localhost:5000")
})