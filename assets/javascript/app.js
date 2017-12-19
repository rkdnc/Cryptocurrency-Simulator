 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyBTIN7h-aav9pozYNp6Uj-sHe-arSOPVTw",
     authDomain: "cryptocurrency-simulator-612ce.firebaseapp.com",
     databaseURL: "https://cryptocurrency-simulator-612ce.firebaseio.com",
     projectId: "cryptocurrency-simulator-612ce",
     storageBucket: "",
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
 var btc;
 var eth;
 var ltc;
 var cash;
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
         myEndPoint.on("value", function (snapshot) {
             console.log(snapshot.val());
             var userInfo = snapshot.val();
             btc = userInfo.wallet.currBTC;
             eth = userInfo.wallet.currETH;
             ltc = userInfo.wallet.currLTC;
             cash = userInfo.wallet.currUSD;
             //add values to sidebar profile
             userBtc.text(btc);
             userEth.text(eth);
             userLtc.text(ltc);
             userCash.text(cash);
         });
     } else {
         console.log("not logged in");
         btnLogout.css("display", "none");
         btnLogin.css("display", "inline");
     }
 })
 //---------------Login System------------
 //--------------API information----------
 var btcBuy = $("#btcBuy");
 var btcSell = $("#btcSell");
 var ethBuy = $("#ethBuy");
 var ethSell = $("#ethSell");
 var ltcBuy = $("#ltcBuy");
 var ltcSell = $("#ltcSell");


 //BTC API
 var btcQueryUrl = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";

 $.ajax({
     url: btcQueryUrl,
     method: "GET"
 }).done(function (bitcoin) {
     // console.log("bitcoin" ,bitcoin);
     //Adding the bitcoin information
     btcBuy.on("click", function (e) {
         e.preventDefault();
         var userPurchase = $("#btcBuyText").val();
         userPurchase = parseInt(userPurchase);
         console.log(`Cash taken: ${userPurchase}`);
         var transactionFee = 0.05 * userPurchase;
         userPurchase = userPurchase - transactionFee;
         console.log(`Cash after transaction fee: ${userPurchase}`);
         var btcBought = userPurchase / bitcoin[0].price_usd;
         console.log(`Btc Bought: ${btcBought}`);
         $("#btcBuyText").val("");

         if (userPurchase <= cash) {
             cash = cash - userPurchase
             btc = btc + btcBought
             console.log(cash);
             console.log(btc);
             myEndPoint.update({
                 "wallet/currBTC": btc,
                 "wallet/currUSD": cash
             })
         } else {
             console.log("No");
             //Need to find a way to alert the user their purchase is invalid
         }
     })
     btcSell.on("click", function (e) {
         e.preventDefault();
         var userSale = $("#btcSellText").val();
         userSale = parseInt(userSale);
         console.log(`Cash given: ${userSale}`);
         var transactionFee = 0.05 * userSale;
         userSale = userSale - transactionFee;
         //log conversion of usd to coin
         var btcSold = userSale / bitcoin[0].price_usd;
         console.log(btcSold);
         $("#btcSellText").val("");

         if(userSale <= cash){
             cash = cash + userSale;
             btc = btc - btcSold;
             myEndPoint.update({
                "wallet/currBTC": btc,
                "wallet/currUSD": cash
            })
         }else {
             console.log("No");
         }
     });
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
     ethBuy.on("click", function (e) {
         e.preventDefault();
         var userPurchase = $("#ethBuyText").val();
         userPurchase = parseInt(userPurchase);
         console.log(`Cash taken: ${userPurchase}`);
         var transactionFee = 0.05 * userPurchase;
         userPurchase = userPurchase - transactionFee;
         console.log(`Cash after transaction fee: ${userPurchase}`);
         var ethBought = userPurchase / ethereum[0].price_usd;
         console.log(`Eth Bought: ${ethBought}`);
         $("#ethBuyText").val("");

         if (userPurchase <= cash) {
             cash = cash - userPurchase
             eth = eth + ethBought
             console.log(cash);
             console.log(eth);
             myEndPoint.update({
                 "wallet/currETH": eth,
                 "wallet/currUSD": cash
             })
         } else {
             console.log("No");
             //Need to find a way to alert the user their purchase is invalid
         }
     });
     ethSell.on("click", function (e) {
        e.preventDefault();
        var userSale = $("#ethSellText").val();
        userSale = parseInt(userSale);
        console.log(`Cash given: ${userSale}`);
        var transactionFee = 0.05 * userSale;
        userSale = userSale - transactionFee;
        //log conversion of usd to coin
        var ethSold = userSale / ethereum[0].price_usd;
        console.log(ethSold);
        $("#ethSellText").val("");

        if(userSale <= cash){
            cash = cash + userSale;
            eth = eth - ethSold;
            myEndPoint.update({
               "wallet/currETH": eth,
               "wallet/currUSD": cash
           })
        }else {
            console.log("No");
        }
    });
     $("#ethPrice").text(`Current Price: $${ethereum[0].price_usd}`);
     $("#ethGrow").text(`Change over the past 24hrs: ${ethereum[0].percent_change_24h}%`);
 });

 //LTC API
 var ltcQueryUrl = "https://api.coinmarketcap.com/v1/ticker/litecoin/";
 // var currltcPrice;
 $.ajax({
     url: ltcQueryUrl,
     method: "GET"
 }).done(function (litecoin) {
     // console.log(litecoin);
     //Adding the litecoin information
     ltcBuy.on("click", function (e) {
         e.preventDefault();
         var userPurchase = $("#ltcBuyText").val();
         userPurchase = parseInt(userPurchase);
         console.log(`Cash taken: ${userPurchase}`);
         var transactionFee = 0.05 * userPurchase;
         userPurchase = userPurchase - transactionFee;
         console.log(`Cash after transaction fee: ${userPurchase}`);
         var ltcBought = userPurchase / litecoin[0].price_usd;
         console.log(`LTC Bought: ${ltcBought}`);
         $("#ltcBuyText").val("");

         if (userPurchase <= cash) {
             cash = cash - userPurchase
             ltc = ltc + ltcBought
             console.log(cash);
             console.log(ltc);
             myEndPoint.update({
                 "wallet/currLTC": ltc,
                 "wallet/currUSD": cash
             })
         } else {
             console.log("No");
             //Need to find a way to alert the user their purchase is invalid
         }

     })
     ltcSell.on("click", function (e) {
        e.preventDefault();
        var userSale = $("#ltcSellText").val();
        userSale = parseInt(userSale);
        console.log(`Cash given: ${userSale}`);
        var transactionFee = 0.05 * userSale;
        userSale = userSale - transactionFee;
        //log conversion of usd to coin
        var ltcSold = userSale / litecoin[0].price_usd;
        console.log(ltcSold);
        $("#ltcSellText").val("");

        if(userSale <= cash){
            cash = cash + userSale;
            ltc = ltc - ltcSold;
            myEndPoint.update({
               "wallet/currLTC": ltc,
               "wallet/currUSD": cash
           })
        }else {
            console.log("No");
        }
    });
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