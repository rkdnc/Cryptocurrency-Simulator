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
 var usersEndPoint = database.ref("/users");

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
     promise.then(function (user) {
         usersEndPoint.child(user.uid).set({
             "userName": user.email
         });
         usersEndPoint.child(user.uid).update({
             wallet: {
                 currBTC: 0,
                 currLTC: 0,
                 currETH: 0,
                 currUSD: 100000
             }
         })
     })
     promise.catch(e => console.log(e.message))

 });

 //Logout user
 btnLogout.on("click", function (event) {
     firebase.auth().signOut();
 })
var myEndPoint;
 //Add realtime listener
 firebase.auth().onAuthStateChanged(firebaseUser => { //Also holy sh*t you can use => for functions
     if (firebaseUser) {
         //current user info
         myEndPoint = usersEndPoint.child(firebaseUser.uid);
         console.log(`Current User: ${myEndPoint}`);
         btnLogout.css("display", "inline");
         btnLogin.css("display", "none");
         btnSignUp.css("display", "none");
         $("#txtEmail").css("display", "none");
         $("#txtPassword").css("display", "none");
         //todo: remove forms if logged in
         //call functions that will tell them their profile information
        //  addUserInfo(myEndPoint);
        myEndPoint.on("value", function(snapshot){
            console.log(snapshot.val());
            var userInfo = snapshot.val();
            var btc = userInfo.wallet.currBTC;
            var eth = userInfo.wallet.currETH;
            var ltc = userInfo.wallet.currLTC;
            var cash = userInfo.wallet.currUSD;
        //add values to sidebar profile
            userBtc.text(`Bitcoin: ${btc}`);
            userEth.text(`Ethereum: ${eth}`);
            userLtc.text(`Litecoin: ${ltc}`);
            userCash.text(`Cash (USD): ${cash}`);
         });
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
 var userBtc = $("#btc");
 var userEth = $("#eth");
 var userLtc = $("#ltc");
 var userCash = $("#cash");

 //-----------Purchasing-----------

 ///.update will change object values
 // myEndPoint.on("value", function(snapshot){
     //$element.text(snapshot.val().wallet.currency)
//  })