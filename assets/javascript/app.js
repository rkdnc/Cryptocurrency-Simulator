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
 btnLogout.on("click", function (event) {
     firebase.auth().signOut();
 })

 //Add realtime listener
 firebase.auth().onAuthStateChanged(firebaseUser => { //Also holy sh*t you can use => for functions
     if (firebaseUser) {
         console.log(firebaseUser);
         btnLogout.css("display", "inline");
         btnLogin.css("display", "none");
         btnSignUp.css("display", "none");
         //todo: remove forms if logged in
         //call functions that will tell them their profile information
         userInformation(firebaseUser)
     } else {
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
 }).done(function (bitcoin) {
     // console.log("bitcoin" ,bitcoin);
     //Adding the bitcoin information
     $("#btcPrice").text(`Current Price: $${bitcoin[0].price_usd}`);
     $("#btcGrow").text(`Change over the past 24hrs: ${bitcoin[0].percent_change_24h}%`);

 })

 //Eth API
 var ethQueryUrl = "https://api.coinmarketcap.com/v1/ticker/ethereum/";

 $.ajax({
     url: ethQueryUrl,
     method: "GET"
 }).done(function (ethereum) {
     // console.log(ethereum);
     //Adding the ethereum information
     $("#ethPrice").text(`Current Price: $${ethereum[0].price_usd}`);
     $("#ethGrow").text(`Change over the past 24hrs: ${ethereum[0].percent_change_24h}%`);
 })

 //LTC API
 var ltcQueryUrl = "https://api.coinmarketcap.com/v1/ticker/litecoin/";

 $.ajax({
     url: ltcQueryUrl,
     method: "GET"
 }).done(function (litecoin) {
     // console.log(litecoin);
     //Adding the litecoin information
     $("#ltcPrice").text(`Current Price: $${litecoin[0].price_usd}`);
     $("#ltcGrow").text(`Change over the past 24hrs: ${litecoin[0].percent_change_24h}%`);
 })
 //---------------------------------------
 //---------------Functionality-----------
 // Initialize collapse button
 $(".button-collapse").sideNav();
 // Initialize collapsible (uncomment the line below if you use the dropdown variation)
 $('.collapsible').collapsible();
 //--------------------------------------
 //-----------User Information-----------
 function userInformation(firebaseUser) {
     //Currently stuck on this
     var wallet = {
         user: firebaseUser.email,
         currUSD: 100000,
         currBTC: 0,
         currEth: 0,
         currLTC: 0
     }
      var users = {
          wallets: wallet
      };


     database.ref().set({
         users: users
     });
 };
 //  console.log(currentUser);


 ////look at the login stuff