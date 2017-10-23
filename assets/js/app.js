//When the page loads show the start button
function loadOpeningPage(){
	var startButton = $("<button>").text("Start Game");
	startButton.addClass("start-game btn btn-danger");
	$("#main-content").append(startButton);
}

$(document).ready(function(){
	//we need to pull questions from an object
var queryUrl = "https://opentdb.com/api.php?amount=20&category=14&type=multiple";
var correct = 0;
var incorrect = 0;
var unanswered = 0;

//display question and answers, mark the answers for correct and incorrect
function display(question, answer1, answer2, answer3, answer4, correctIndex){

	var q = "<p>" + question + "</p>";
	var answer = [answer1, answer2, answer3, answer4];

	$("#questions").append(q);

	for(var i = 0; i < answer.length; i++){
		var answerDiv = $("<div>");
		answerDiv.addClass("form-group")
		var radioInput = $("<input>");
		radioInput.attr("type", "radio");
		radioInput.attr("name", question);
		
		answerDiv.append(radioInput).append(answer[i]);
		if(i === correctIndex){
			answerDiv.attr("value", "correct");
		}else{
			answerDiv.attr("value", "incorrect");
		}
		answerDiv.addClass("options");
		$("#questions").append(answerDiv);
	}
	$("#questions").append("<br>");

}
//set timer
//timer starts at 30 seconds
function setTimer(){
	var time = 60;
	var int = setInterval(function(){ 
			while(time > 0){
				time = time -1;
				$("#timer").html(time);
				return time;
			}
	}, 1000);
	if(int <= 0){
		clearInterval(int);
	}
}
	

//when all the questions have been answered it goes to the last page showing stats of right and wrong answers
function loadGameOverPage(){
	$("#questions").empty();
	var startButton = $("<button>").text("Start Again");
	startButton.addClass("start-game btn btn-danger");
	startButton.on("click", function(){
		$("#questions").empty();
		setTimer();
	$(".start-game").remove();
	$.ajax({
		url: queryUrl,
      	method: "GET"
	}).done(function(response){
		var triviaQ = response.results;

		display(triviaQ[0].question, triviaQ[0].correct_answer, triviaQ[0].incorrect_answers[0], triviaQ[0].incorrect_answers[1], triviaQ[0].incorrect_answers[2], 0);
		display(triviaQ[1].question, triviaQ[1].incorrect_answers[0], triviaQ[1].correct_answer, triviaQ[1].incorrect_answers[1], triviaQ[1].incorrect_answers[2], 1);
		display(triviaQ[2].question, triviaQ[2].incorrect_answers[2], triviaQ[2].incorrect_answers[0], triviaQ[2].incorrect_answers[1], triviaQ[2].correct_answer, 3)
		display(triviaQ[3].question, triviaQ[3].incorrect_answers[1], triviaQ[3].incorrect_answers[0], triviaQ[3].correct_answer, triviaQ[3].incorrect_answers[2], 2);
		display(triviaQ[4].question, triviaQ[4].incorrect_answers[1], triviaQ[4].incorrect_answers[0], triviaQ[4].correct_answer, triviaQ[4].incorrect_answers[2], 2);
		display(triviaQ[5].question, triviaQ[5].incorrect_answers[0], triviaQ[5].correct_answer, triviaQ[5].incorrect_answers[1], triviaQ[5].incorrect_answers[2], 1);
		display(triviaQ[6].question, triviaQ[6].incorrect_answers[0], triviaQ[6].correct_answer, triviaQ[6].incorrect_answers[1], triviaQ[6].incorrect_answers[2], 1);
		display(triviaQ[7].question, triviaQ[7].correct_answer, triviaQ[7].incorrect_answers[0], triviaQ[7].incorrect_answers[1], triviaQ[7].incorrect_answers[2], 0);
		display(triviaQ[8].question, triviaQ[8].incorrect_answers[0], triviaQ[8].correct_answer, triviaQ[8].incorrect_answers[1], triviaQ[8].incorrect_answers[2], 1);
		display(triviaQ[9].question, triviaQ[9].incorrect_answers[0], triviaQ[9].correct_answer, triviaQ[9].incorrect_answers[1], triviaQ[9].incorrect_answers[2], 1);
		display(triviaQ[10].question, triviaQ[10].correct_answer, triviaQ[10].incorrect_answers[0], triviaQ[10].incorrect_answers[1], triviaQ[10].incorrect_answers[2], 0);
		display(triviaQ[11].question, triviaQ[11].incorrect_answers[1], triviaQ[11].incorrect_answers[0], triviaQ[11].correct_answer, triviaQ[11].incorrect_answers[2], 2);
		display(triviaQ[12].question, triviaQ[12].incorrect_answers[2], triviaQ[12].incorrect_answers[0], triviaQ[12].incorrect_answers[1], triviaQ[12].correct_answer, 3);
		display(triviaQ[13].question, triviaQ[13].incorrect_answers[1], triviaQ[13].incorrect_answers[0], triviaQ[13].correct_answer, triviaQ[13].incorrect_answers[2], 2);
		display(triviaQ[14].question, triviaQ[14].incorrect_answers[0], triviaQ[14].correct_answer, triviaQ[14].incorrect_answers[1], triviaQ[14].incorrect_answers[2], 1);

		setTimeout(function(){
		loadGameOverPage();
	},60000);

	});
	})
	var correctAnswers = $("<div>").html("Correct Answers: " + correct);
	var wrongAnswers = $("<div>").html("Incorrect Answers: " + incorrect);
	var unansweredAnswers = $("<div>").html("Unanswered: " + (15 - correct - incorrect));
	$("#questions").html("<h1>All done! Look at your stats: </h1>");
	$("#questions").append(correctAnswers).append(wrongAnswers).append(unansweredAnswers);
	$("#main-content").append(startButton);

}


//if you click on start button it resets the game wihtout reloading the page 
$(".start-game").on("click", function(){
	console.log("Trivial Trivia Loaded");
	$("#questions").empty();
	setTimer();
	$(".start-game").remove();
	$.ajax({
		url: queryUrl,
      	method: "GET"
	}).done(function(response){
		var triviaQ = response.results;

		display(triviaQ[0].question, triviaQ[0].correct_answer, triviaQ[0].incorrect_answers[0], triviaQ[0].incorrect_answers[1], triviaQ[0].incorrect_answers[2], 0);
		display(triviaQ[1].question, triviaQ[1].incorrect_answers[0], triviaQ[1].correct_answer, triviaQ[1].incorrect_answers[1], triviaQ[1].incorrect_answers[2], 1);
		display(triviaQ[2].question, triviaQ[2].incorrect_answers[2], triviaQ[2].incorrect_answers[0], triviaQ[2].incorrect_answers[1], triviaQ[2].correct_answer, 3)
		display(triviaQ[3].question, triviaQ[3].incorrect_answers[1], triviaQ[3].incorrect_answers[0], triviaQ[3].correct_answer, triviaQ[3].incorrect_answers[2], 2);
		display(triviaQ[4].question, triviaQ[4].incorrect_answers[1], triviaQ[4].incorrect_answers[0], triviaQ[4].correct_answer, triviaQ[4].incorrect_answers[2], 2);
		display(triviaQ[5].question, triviaQ[5].incorrect_answers[0], triviaQ[5].correct_answer, triviaQ[5].incorrect_answers[1], triviaQ[5].incorrect_answers[2], 1);
		display(triviaQ[6].question, triviaQ[6].incorrect_answers[0], triviaQ[6].correct_answer, triviaQ[6].incorrect_answers[1], triviaQ[6].incorrect_answers[2], 1);
		display(triviaQ[7].question, triviaQ[7].correct_answer, triviaQ[7].incorrect_answers[0], triviaQ[7].incorrect_answers[1], triviaQ[7].incorrect_answers[2], 0);
		display(triviaQ[8].question, triviaQ[8].incorrect_answers[0], triviaQ[8].correct_answer, triviaQ[8].incorrect_answers[1], triviaQ[8].incorrect_answers[2], 1);
		display(triviaQ[9].question, triviaQ[9].incorrect_answers[0], triviaQ[9].correct_answer, triviaQ[9].incorrect_answers[1], triviaQ[9].incorrect_answers[2], 1);
		display(triviaQ[10].question, triviaQ[10].correct_answer, triviaQ[10].incorrect_answers[0], triviaQ[10].incorrect_answers[1], triviaQ[10].incorrect_answers[2], 0);
		display(triviaQ[11].question, triviaQ[11].incorrect_answers[1], triviaQ[11].incorrect_answers[0], triviaQ[11].correct_answer, triviaQ[11].incorrect_answers[2], 2);
		display(triviaQ[12].question, triviaQ[12].incorrect_answers[2], triviaQ[12].incorrect_answers[0], triviaQ[12].incorrect_answers[1], triviaQ[12].correct_answer, 3);
		display(triviaQ[13].question, triviaQ[13].incorrect_answers[1], triviaQ[13].incorrect_answers[0], triviaQ[13].correct_answer, triviaQ[13].incorrect_answers[2], 2);
		display(triviaQ[14].question, triviaQ[14].incorrect_answers[0], triviaQ[14].correct_answer, triviaQ[14].incorrect_answers[1], triviaQ[14].incorrect_answers[2], 1);

		setTimeout(function(){
		loadGameOverPage();
	},60000);

		//check answers
$(".options").on("click", function(){
	if($(this).attr("value") === "correct"){
		correct = correct + 1;
	}else if($(this).attr("value") === "incorrect"){
		incorrect = incorrect + 1;
	}
})
	});
});



});


