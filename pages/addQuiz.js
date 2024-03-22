// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { 
    getDatabase,
    set,
    ref,
    push
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAPd3oHkpw0LQDAhPv2lbE1CFgQGwKTijE",
   authDomain: "quizapp-18bff.firebaseapp.com",
   databaseURL: "https://quizapp-18bff-default-rtdb.firebaseio.com",
   projectId: "quizapp-18bff",
   storageBucket: "quizapp-18bff.appspot.com",
   messagingSenderId: "1032215169977",
   appId: "1:1032215169977:web:faf3751f8ce9ff30dec468",
   measurementId: "G-ZF3M53N04N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var question = document.getElementById("question");
var option = document.getElementById("option");
var optionsParent = document.getElementById("optionsParent");
var correctAnswerElem = document.getElementById("correctAnswer");

var options = [];
var correctAnswer;

function renderOptions(){
    optionsParent.innerHTML = "";
    for(var i =0 ; i<options.length ; i++){
        optionsParent.innerHTML +=
         `<li onclick= "setCorrectAns('${options[i]}')" class="p-2 bg-light fs-5 rounded shadow my-2">${options[i]}</li>`
    }
}

window.addOption = function (){
    options.push(option.value);
    console.log(options);
    renderOptions()
}
window.setCorrectAns = function (a){
    correctAnswer = a;
    correctAnswerElem.innerHTML = correctAnswer;

}
window.submitQuestion = function (){
    var obj = {
        question : question.value,
        options : options,
        correctAnswer : correctAnswer
    };

    obj.id = push(ref(db , 'questions/')).key;
    var reference = ref(db , `questions/${obj.id}`);
    set(reference , obj);
    console.log(obj);
}