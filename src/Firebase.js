import * as firebase from "firebase";

const settings = {};

const config = {
  apiKey: "AIzaSyBOeE1MfTOyfaxKMvNZqOqsZWJPV72ATXQ",
  authDomain: "property-address-management.firebaseapp.com",
  databaseURL: "https://property-address-management.firebaseio.com",
  projectId: "property-address-management",
  storageBucket: "property-address-management.appspot.com",
  messagingSenderId: "570863075122",
  appId: "1:570863075122:web:c09520aec3fec24d"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
