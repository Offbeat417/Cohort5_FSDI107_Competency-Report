//**GLOBAL Variables */
var items = [
{   
    code: "asdd123",
    title: "Test Prouct",
    price: "$123.45",
    description: "This, is a test. This, is only, a test.",
    category: "electronics",
    ratings: "4/5 stars",
    image: "img1.jpg"
},
{
    code: "asdd124",
        title: "T-Shirt",
        price: "$17",
        description: "The grayest of T-Shirts you could ever want.",
        category: "clothing",
        ratings: 4,
        image: "img2.jpg"
},
{
    code: "asdd125",
        title: "Teddy Bear",
        price: "$18",
        description: "For when the night is dark and full of terrors",
        category: "toys",
        ratings: 4,
        image: "img3.jpg"
},
{
    code: "asdd126",
        title: "Sorry! Board Game",
        price: "$19",
        description: "Played best with suspensful music",
        category: "board games",
        ratings: 4,
        image: "img4.jpg"
},
{
    code: "asdd127",
        title: "Crayola",
        price: "$3",
        description: "A Marine's favorite snack!",
        category: "school supplies",
        ratings: 4,
        image: "img5.jpg"
}





]
var serverURL = 'http://localhost:8080'

//**functions*/

function displayCatalog(){
    /**
     * Travel the array
     * Get each element from the array
     * Display the element into the DOM (html)
     */

    $.ajax({
        url: serverURL + "/API/products",
        type: "GET",
        success: function(res){

    for(var i=0; i< res.length; i++){
        var theItem = res[i];

        if(theItem.user == "William"){//filters so all items shown are mine
            items.push(theItem);
        }

        displayItem(theItem);
 
        //Us displaying it, both on console and on HTML file
        //Remember to ensure that all this is inside the For Loop!
    }
    }
    })
}

function displayItem(product){
    var pLayout = `<div class="item">
        <img src="images/${product.image}">
        <h4>${product.title}</h4>
        <h4>${product.price}</h4>
        <p>${product.description}</p>
        <p>${product.ratings}</p>
        <button type="button" class="btn btn-info">Add to Cart</button>
        </div> `;

    $("#catalog").append(pLayout);
}

function search(){

    //get the text
    var text = $("#txtSearch").val();
    console.log("txtSearch",text);
    //clear the catalog
    $("#catalog").html("");

    /**
     * Travel the Array
     * get each element from the array
     * compare the text with the item.title
     * if match, display the item
     */
    for(var i = 0; i < items.length; i++){
        var product = items[i];
        //Note: parse string to lower case to remove case sensitivity
        console.log("product",product.title.toLowerCase(),text.toLowerCase());
        if(
            product.title.toLowerCase().includes(text.toLowerCase() )
            ||product.code.toLowerCase().includes(text.toLowerCase())
            ||product.description.toLowerCase().includes(text.toLowerCase())
            || product.price.toLowerCase().includes(text.toLowerCase())
            ||product.ratings.toString().includes
            ) {
            displayItem(product);   
            }
    }
}

function init(){
    console.log("Catalog Page");

    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function(e){
        if(e.key == "Enter"){
            search();
            e.preventDefault(); //prevent default action(in this case, form submit)
        }
    });

    displayCatalog(); //this is the first thing created for the JS file. This focuses inititally on whatever is contained in it. In this case, the display function we've created.

}

/**Initialization */
window.onload = init;
