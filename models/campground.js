var mongoose = require("mongoose")
var cmpSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"  //name of collection in database
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"  //name of collection in database
        },
        username: String
    }
});

module.exports = mongoose.model("campgrounds", cmpSchema) 
//to compile into the model to use 'Campground.create',etc. functions
//first argument in mongoose.model (i.e. campgrounds) is name of collection in database