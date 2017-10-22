//When the page loads show the start button
function loadOpeningPage(){
	var startButton = $("<button>").text("Start Game");
	startButton.addClass("start-game");
	$("#main-content").append(startButton);
}

$(document).ready(function(){
	//we need to pull questions from an object
var queryUrl = "https://opentdb.com/api.php?amount=20&category=14&type=multiple";
var correct = 0;
var incorrect = 0;
var unanswered = 0;

//display question and answers, mark the answers for correct and incorrect
function display(question, answer1, answer2, answer3, answer4){
	var q = "<h1>" + question + "</h1>";
	var answer = [answer1, answer2, answer3, answer4];

	$("#question").html(q);

	for(var i = 0; i < answer.length; i++){
		var answerDiv = $("<div>");
		answerDiv.html(answer[i]);
		if(i === 0){
			answerDiv.attr("data-answer", "correct");
		}else{
			answerDiv.attr("data-answer", "incorrect");
		}
		answerDiv.addClass("options");
		$("#answers").append(answerDiv);
	}
}

//timer starts at 30 seconds
function setTimer(){
	var time = 30;
	var int = setInterval(function(){ 
			while(time > 0){
				time = time -1;
				$("#timer").html(time);
				return time;
			}
	}, 1000);
	if(time <= 0){
		clearInterval(int);
	}
}



//when the user selects an aswer or when the timer runs out it goes to answer screen
function displayAnswerScreen(isAnswerCorrect, hasTimeRanOut, correctAnswer){
	var answerScreen = $("#questions-content");
		$("#question").empty();
		$("#answer").empty();
	if(isAnswerCorrect){
		$("#question").html("<h1>Correct!</h1>");
		correct = correct + 1;
	}else if(!isAnswerCorrect){
		$("#question").html("<h1>Nope!</h1>");
		$("#answer").html("<p>The correct answer is:"+ correctAnswer +" </p>");
		incorrect = incorrect+ 1;
	}else if(hasTimeRanOut){
		$("#question").html("<h1>Time has ran out!</h1>");
		$("#answer").html("<p>The correct answer is:"+ correctAnswer +" </p>");
		unanswered = unanswered + 1;
	}
}
//next question is loaded again and and timer starts again at 30 seconds
//when all the questions have been answered it goes to the last page showing stats of right and wrong answers
function loadLastPage(){
	$("#question").empty();
	$("#answer").empty();
	var startButton = $("<button>").text("Start Again");
	startButton.addClass("start-game");
	var correctAnswers = $("<div>").html("Correct Answers: " + correct);
	var wrongAnswers = $("<div>").html("Incorrect Answers: " + Incorrect);
	var unansweredAnswers = $("<div>").html("Unanswered: " + unanswered);
	$("#question").html("<h1>All done! Look at your stats: </h1>");
	$("#answer").append(correctAnswers).append(wrongAnswers).append(unansweredAnswers);
	$("#main-content").append(startButton);

}
//if you click on start button it resets the game wihtout reloading the page 
$(".start-game").on("click", function(){
	$(".start-game").remove();
	$.ajax({
		url: queryUrl,
      	method: "GET"
	}).done(function(response){
		var index = 0;
		while(index < response.results.length){
			var triviaQ = response.results[index];
		display(triviaQ.question, triviaQ.correct_answer, triviaQ.incorrect_answers[0], triviaQ.incorrect_answers[1], triviaQ.incorrect_answers[2]);
		index++;
		//on answer screen it shows if you got it right or wrong and show the correct answer and stays there for three seconds before going to next question
		}
	});
});


});


