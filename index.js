var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://localhost:27017');
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

var itemModel = require("./models/Item");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res){
    res.send("Mongo example server is live!");
})

app.get("/upload", function(req, res){
    res.render("pages/upload");
});

app.get("/list", function(req,res) {
    itemModel.listAllItem().then(function(item){
        console.log(item)
        res.render("pages/list", {item:item});
    });
    
})

app.get("/before/:year", function(req, res) {
    itemModel.find({year : {$lt : req.params.year}}).then(function(item){
        res.render("pages/list", {item:item});
    });
});

app.post('/Item', function(req, res){
    console.log("Request Body: ", req.body);
    console.log("Item: " + JSON.stringify(req.body.item));
    var newItem = new itemModel(req.body.item);
    
    newItem.save().then(function(){
        res.send("Added new item to database!");
        console.log()
    }).catch(function(err){
            console.log("Error saving item:", err);
            res.status(500).send("Error saving item.");
    });

});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});