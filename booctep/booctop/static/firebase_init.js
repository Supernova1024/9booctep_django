var Config = {
	apiKey: "AIzaSyAoBR3g9AXuF2GXzlgsJ5DWGiQW1sPdk9g",
	authDomain: "booctop.firebaseio.com",
	databaseURL: "https://booctop.firebaseio.com/",
	projectId: "booctop",
	storageBucket: "booctop.appspot.com",
};

// Initialize Firebase
var defaultProject = firebase.initializeApp(Config);
var db = firebase.firestore();