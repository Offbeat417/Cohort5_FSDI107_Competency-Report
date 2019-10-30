
// var serverURL = "http://localhost:8080";
var serverURL = "http://localhost:8080";


//Object constructor for items
function Item(code, title, price, description, category, ratings, image) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.ratings = ratings;
    this.image = image;
    this.user = "william";
}

function clearForm(){ //clears all fields listed below, when called upon
    $("txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtDescription").val("");
    $("#txtCategory").val("");
    $("#txtRatings").val("");
    $("#txtImage").val("");

}

//the below variables are sent into the Item function
function saveItem() {
    //get values
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var price = $("#txtPrice").val();
    var description = $("#txtDescription").val();
    var category = $("#txtCategory").val();
    var ratings = $("#txtRatings").val();
    var image = $("#txtImage").val();

    //create an object
    var test = new Item(code, title, price, description, category, ratings, image);
    console.log(test);

    //send the object to a server
    $.ajax({
        url: serverURL + "/API/products",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(test),
        success: function (response) {
            //alert user
            console.log("Data Saved, server responded with ", response);
            clearForm();//clears form after submission
            $("#alert").removeClass("hide",);

            //set timer to execute osm eactions
            setTimeout(
                function(){
                    $("#alert").addClass("hide");
                },
                5000 //5 seconds
            );
        },
        error: function (details) {
            console.log("Error, something went wrong", details);
        }
        //only strings allowed in AJAX requests, so use stringify
        //to see the objects submitted, use the /API/points at the end!

    });
}

function solveHomework() {
    var data = [
        {
            age: 99,
            name: "Sergio",
            color: "Gray"
        },
        {
            age: 23,
            name: "John",
            color: "Blue"
        },
        {
            age: 27,
            name: "Alice",
            color: "Pink"
        },
        {
            age: 87,
            name: "Robert",
            color: "Gray"
        },
        {
            age: 23,
            name: "Sheldon",
            color: "Black"
        },
        {
            age: 45,
            name: "Will",
            color: "Green"
        },
        {
            age: 16,
            name: "Kevin",
            color: "Yellow"
        },
        {
            age: 37,
            name: "Liz",
            color: "Pink"
        },
        {
            age: 98,
            name: "Noah",
            color: "White"
        },
        {
            age: 31,
            name: "Alfredo",
            color: "White"
        },
        {
            age: 74,
            name: "Rhenard",
            color: "Green"
        }, {
            age: 39,
            name: "Myk",
            color: "Blue"
        }
    ]



    var sumOfAges = 0;
    var oldestAge = 0;
    var oldestName = "";

    var youngestAge = data[0].age;
    var youngestName= data[0].name;

    for (var i = 0; i < data.length; i++) {
        var person = data[i];

        sumOfAges = person.age;
        console.log(person.name);

        if(person.age < youngestAge){
            youngestAge = person.age;
            youngestName = person.name;
        }

        //compare the age of the person with olderAge
        if (person.age > oldestAge) {
            oldestAge += person.age;
            oldestName = person.name;
        }
    }

    console.log("Oldest is " + oldestName + " and has " + oldestAge + " years");
    console.log("Oldest age: " + oldestAge);
    console.log("Answer 3: ", sumOfAges);

}

function loadMessages(){
    var name = "William";

    $.ajax({
        url: '/api/message/' + name,
        type: 'GET',
        success: function(res) {
            console.log("Server says:", res);
            for(var i=0; i<res.length;i++){
                displayMessage(res[1]);
            }
        },
        error: function(error) {
            console.log("Error loading messages", error);
        }
    });

}

function displayuMessage(message){
    var container = $("messageList");
    var template = `<li><ahref='mailto:${message.mail}'> ${message.name} - ${message.message} </li>`;
    container.append(template);
}


function init() {
    console.log("admin page");

    //events
    $("#btnSave").click(saveItem);

    //load messages
    loadMessages();



}


window.onload = init;