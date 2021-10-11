import firebase from 'firebase';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux'
let config = {
    apiKey: "AIzaSyBHymcsw0Xh9fnmQJ4PKQ19PkGc8AQTHpc",
    authDomain: "gig-app-49890.firebaseapp.com",
    projectId: "gig-app-49890",
    storageBucket: "gig-app-49890.appspot.com",
    messagingSenderId: "761576497917",
    appId: "1:761576497917:web:e2db0611db945be3cb1494",
    measurementId: "G-QCD7E9MCY8"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);
export default store;