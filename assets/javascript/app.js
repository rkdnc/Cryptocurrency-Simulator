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
        btnLogin.css("display", "inline")
    } else{
        console.log("not logged in");
        btnLogin.css("display", "none")
    }
 })
 



 