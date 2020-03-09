var mongoose    = require("mongoose")
    Campground  = require("./models/campground")

var data = [
    {
        name: "hey1",
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        description: "Nothing"
    },
    {
        name: "hey2",
        image: "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg",
        description: "Nothing_lorem ipsum"
    }
]
function seedDB(){
    Campground.remove({}, function(err)
    {
        if(err){
            console.log(err)
        }
        else{
            console.log("All campgrounds removed")
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, data){
            //         if(err){
            //             console.log(err)
            //         }
            //         else{
            //             console.log("Added a Campground!")
            //         }
            //     })
            // })
        }
    })
}

module.exports = seedDB