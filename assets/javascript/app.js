 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyBTIN7h-aav9pozYNp6Uj-sHe-arSOPVTw",
     authDomain: "cryptocurrency-simulator-612ce.firebaseapp.com",
     databaseURL: "https://cryptocurrency-simulator-612ce.firebaseio.com",
     projectId: "cryptocurrency-simulator-612ce",
     storageBucket: "",
     messagingSenderId: "224232616282"
 };
 firebase.initializeApp(config);
 // Database initialized.
 var database = firebase.database();

 //---------------Login System------------
 //Getting elements
 var txtEmail = $("#txtEmail")
 var txtPassword = $("#txtPassword")
 var btnLogin = $("#btnLogin");
 var btnSignUp = $("#btnSignUp");
 var btnLogout = $("#btnLogout")

 //Login event

 btnLogin.on("click", function (event) {
     //get email and password
     var email = txtEmail.val();
     var password = txtPassword.val();
     var auth = firebase.auth();
     //Sign in
     var promise = auth.signInWithEmailAndPassword(email, password);
     promise.catch(e => console.log(e.message))
 });

 //Signup Event

 btnSignUp.on("click", function (event) {
 //get email and password
 var email = txtEmail.val();
 var password = txtPassword.val();
 var auth = firebase.auth();
 //Sign in
 var promise = auth.createUserWithEmailAndPassword(email, password);
 promise.catch(e => console.log(e.message))
 });

//Logout user
btnLogout.on("click", function(event){
    firebase.auth().signOut();
})

 //Add realtime listener
 firebase.auth().onAuthStateChanged(firebaseUser =>{ //Also holy sh*t you can use => for functions
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.css("display", "inline");
        btnLogin.css("display", "none");
        btnSignUp.css("display", "none");
    } else{
        console.log("not logged in");
        btnLogout.css("display", "none");
        btnLogin.css("display", "inline");
    }
 })
//---------------Login System------------
//--------------API information----------

//BTC API
var btcQueryUrl = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";

$.ajax({
    url: btcQueryUrl,
    method: "GET"
}).done(function(bitcoin){
    console.log(bitcoin);
})


//LTC API
var ltcQueryUrl = "https://api.coinmarketcap.com/v1/ticker/litecoin/";

$.ajax({
    url: ltcQueryUrl,
    method: "GET"
}).done(function(litecoin){
    console.log(litecoin);
})

//Eth API
var ethQueryUrl = "https://api.coinmarketcap.com/v1/ticker/ethereum/";

$.ajax({
    url: ethQueryUrl,
    method: "GET"
}).done(function(ethereum){
    console.log(ethereum);
})




 