// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { 
    getDatabase,
    onChildAdded,
    ref,
 } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
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

var loader = document.getElementById("loader");
var showQuestion = document.getElementById("showQuestion");

// function getDataFromDatabase(){
//     loader.style.display = 'block';  
//     showQuestion.style.display = 'none';

//     const reference = ref(db , 'questions/');
//     onChildAdded(reference , function (data){
//         console.log(data.val());
//         questions.push(data.val());
//         loader.style.display = 'none';
//         showQuestion.style.display = 'block';
//         renderQuestion();
//     })
// }
// getDataFromDatabase()
function getDataFromDatabase() {
    loader.style.display = 'block';  
    showQuestion.style.display = 'none';

    const reference = ref(db, 'questions/');
    return new Promise((resolve) => {
        onChildAdded(reference, function (data) {
            console.log(data.val());
            questions.push(data.val());
            loader.style.display = 'none';
            showQuestion.style.display = 'block';
            resolve();
        });
    });
}

getDataFromDatabase().then(() => {
    renderQuestion();
});


var questions = [
    // {
    //     question: "If Sally has 8 apples and gives 3 to her friend, how many apples does she have left?",
    //     options: [
    //         "2", 
    //         "5", 
    //         "3", 
    //         "8"],
    //     correctAnswer: "5"
    // },
    // {
    //     question: "What is the sum of 9 and 6?",
    //     options: [
    //         "11", 
    //         "14", 
    //         "12", 
    //         "15"],
    //     correctAnswer: "15"
    // },
    // {
    //     question:"If a box has 5 red balls, 3 blue balls, and 2 green balls, how many balls are there in total?",
    //     options:["7","8","10","12"],
    //     correctAnswer:"10"
    // },
    // {
    //     question:"If a pencil costs 4 rupees, how much will 5 pencils cost?",
    //     options:["10 rupees","15rupees","20 rupees","25 rupees"],
    //     correctAnswer:"20 rupees",
    // },
    // {
    //     question:"If a rectangle has a length of 7 units and a width of 4 units, what is its area?",
    //     options:["28 square units","18 square units","11 square units","14 square units"],
    //     correctAnswer:"28 square units",
    // }
    
];
var currentQuestion = document.getElementById("currentQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var answerParent = document.getElementById("answerParent");

var indexValue = 0;
var marks = 0;

window.checkQuestion = function (a , b){
    console.log('User Answer:', a);
    console.log('Correct Answer:', b);

    if (a === b) {
        marks++;
        console.log(marks);
        nextQuestion();
    }
    // if (a === b){
    //     marks ++;
    //     console.log(marks);
    //     nextQuestion();
    // }
}
// renderQuestion()

window.nextQuestion = function(){
    if (indexValue +1 == questions.length){
        alert("Your score is :" + marks);
    }else{
        indexValue ++;
        renderQuestion();
    }
}

function renderQuestion(){
    currentQuestion.innerHTML = indexValue +1;
    totalQuestion.innerHTML = questions.length;
    var obj = questions[indexValue];
    question.innerHTML = obj.question;

    answerParent.innerHTML = '';
    for (var i =0 ; i <obj.options.length ; i ++){
        answerParent.innerHTML += `<div class="col-md-4">
        <div class="py-3">
            <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAns}')" class="btn btn-dark fs-4 rounded-pill w-100">
                ${obj.options[i]}
            </button>
        </div>
    </div>`;
    }
}


