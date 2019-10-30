var http = require("http");
var express = require("express");

var app = express();

/**
 * CONFIGURATION
 */
//Read req body as obj
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//This ^ enables you to read objects the client sends


// to serve HTML content

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//To server static files (css, js, images, documents, etc)
app.use(express.static(__dirname + '/public'));


//Enable CORS Security-allows computer to be both client and server.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Mongoose connection
var mongoose = require("mongoose");
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-001-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;

// to serve HTML content (EJS = Embedded Javascript templates)
var ejs = require('ejs'); //ejs sends html from server as string
app.set("views", __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//DB obj constructor
var ItemDB;
var messageDB;


/**
 * WEB SERVER FUNCITONALITY
 */

 app.get("/", function (req, res){
     res.render('index.html')
 })
app.get("/contact", function (req, res) {
    res.render("contact.html");
});

app.get("/catalog", function (req, res) {
    res.render("index.html");
});

app.get('/admin', function (req, res){
    res.render('admin.html');
})

var bodyParser = require("body-parser"); //reads req body as object (json)
app.use(bodyParser.json());


/**
 * API FUNCTIONALITY
 * store(post) items, then send(get) the items back below
 */
var items = [];
var count = 0;

app.get('/api/products', function (req, res) {
    console.log("User wants the catalog");

    //res.json(items);
    ItemDB.find({},function(error, data){ //{} parameter means all data
        if(error){
            console.log("**Error on retrieving**",error);
            res.status(500);
            res.send(error); //lets the client know there's an error
        }

        res.status(200); //okay
        res.json(data);
    });
});

app.get('/api/products/:user', function(req, res){
    var name = req.params.user;

    ItemDB.find({ user: name }, function(error, data){ //gets only parameters
        if(error){
            console.log("**Error filtering", error);
            res.status(500);
            res.json(error);
        }
        res.status(200)
        res.json(data);
    });
});

//*2
app.post('/api/products', function (req, res) {
    console.log("User wants to save item");

    //create a DB object
    //item.TheCode = item.code; // **1
    var itemForMongo = ItemDB;
    itemForMongo.save(function(error,savedItem){
        if(error){
            console.log("**Error saving item to DB",error);
            res.status(500); //internal server error
            res.send(error);
            //dont put anything below this, won't be executed
        }
        console.log("Item saved correctly");
        res.status(201); //fine, created.
        res.json(savedItem);
    });

});


app.post('/api/message', function(req,res){
    var msg = req.body;
    console.log("New Message From", msg.name);

    var msgForMongo = messageDB(req.body);
    msgForMongo.save(function(error,savedMsg){
        if(error){
            console.log("Error saving message", error);
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(savedMsg);
    });
});

app.get('/api/message/:user', function(req, res){
    var username = req.params.user;

    messageDB.find({ user: userName}, function(error, data){
        if(error){
            console.log("Error reading data", error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    })
});



//catch error on mongo conection
db.on('error',function(error){
    console.log("**ERROR connecting to MongoDB**", error);
});

//catch success on mongo connection
db.on('open',function(){
    console.log("Conneciton Success! The database is connected to the server");

    /**
     * The allowed Schema types are: string, number, date, buffer, boolean, mixed, objectId, array
     */

    //Define a schema for the collection (Table)
    var itemSchema = mongoose.Schema({
            TheCode: String,
            title: String,
            price: Number,
            description: String,
            category: String,
            rating: Number,
            image: String,
            user: String
    });

    var messageSchema = mongoose.Schema({
        name: String,
        mail: String,
        message: String,
        user: String
    });

    //create constructor(s) for the schema(s)
    ItemDB = mongoose.model("itemCH5", itemSchema);
    messageDB = mongoose.model("messageCH5", messageSchema);
});



app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
    //IP = 127.0.01 <-- this is localhost:8080's IP
});



//**1: would have to do for every item if the front end and back end were created by two different teams. This is an example. We don't have to do it with every single part of an item because we have the advantage of manipulating both the front end and back end. 

//*2: this works for just about any device. MongoDB doesn't care what devices or the purpose of the code necessarily, it only cares about the data it receives. So essentially, you can use literally anything, even a fucking thermostat if you wanted to; it's gonna work no matter what.