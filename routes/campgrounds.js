var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware") //if directory is included then index.js file is taken as default

router.get("/", function(req, res) {
    // res.render("campgrounds", {campgrounds: cmp}) // 2nd argument in render is used to pass variable in ejs
    Campground.find({}, function(err, allcmp){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allcmp})
        }
    })
})

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

//POST
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image, description, author} //name: name (key and value same) can be written as just name
    Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else{
                console.log(newlyCreated)
                res.redirect("/campgrounds")
            }
        });
})

//SHOW more info about campgrounds
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCmp){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCmp)
            res.render("campgrounds/show", {campground: foundCmp})
        }
    })
})

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    })
})

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.cmp, function(err, updatedCmp){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        } else{
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router