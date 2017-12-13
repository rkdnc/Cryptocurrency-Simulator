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
 



 //Error handling
 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // ...
 });