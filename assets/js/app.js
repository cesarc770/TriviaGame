//get questions
var queryUrl = "https://opentdb.com/api.php?amount=20&category=14&type=multiple";
var questions;
var answers;

$.ajax({
		url: queryUrl,
      	method: "GET"
	}).done(function(response){
		questions = response.results
	});
//start game
$("#start").on("click", function(){
	$("#start").remove();
	game.loadQuestion();
});

$(document).on("click", ".answer-button", function(event){
	game.clicked(event);
});
$(document).on("click", "#reset", function(event){
	game.reset();
});


var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30,
	correct: 0,
	incorrect: 0,
	unanswered: 0,
	countdown: function(){
		game.counter--;
		$("#counter").html(game.counter);
		if (game.counter <= 0) {
			console.log("Time Up!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countdown, 1000);
		$("#subwrapper").html("<h2 id='counter'>30</h2>")
		$("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
		answers = questions[game.currentQuestion].incorrect_answers;
		if(answers.length < 4)
			answers.push(questions[game.currentQuestion].correct_answer);
		answers.sort();
		console.log(answers);
		for(var i = 0; i <answers.length; i++){
			$("#subwrapper").append("<button class='answer-button' id='button-"+i+"' data-name='" + answers[i] + "' >" + answers[i] + "</button>");
		}
	},
	nextQuestion: function(){
		game.counter = 30;
		$("#counter").html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();

	},
	timeUp: function(){
		clearInterval(timer);
		game.unanswered++;
		$("#subwrapper").html("<h2>YOU RAN OUT OF TIME!!!</h2>");
		$("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correct_answer +" </h3>");
		if(game.currentQuestion === questions.length-1){
			setTimeout(game.results, 3*1000);
		}else{
			setTimeout(game.nextQuestion, 3*1000);
		}
	},
	results: function(){
		clearInterval(timer);
		$("#subwrapper").html("<h2>DONE!!!</h2>");
		$("#subwrapper").append("<h3>Correct: " + game.correct +"</h3>");
		$("#subwrapper").append("<h3>Incorrect: " + game.incorrect+ "</h3>");
		$("#subwrapper").append("<h3>Unanswered: " + game.unanswered+ "</h3>");
		$("#subwrapper").append("<button id='reset'>RESET</button>");

	},
	clicked: function(event){
		clearInterval(timer);
		if($(event.target).data("name") == questions[game.currentQuestion].correct_answer){
			game.answeredCorrectly();
		}else{
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function(){
		clearInterval(timer);
		game.correct++;
		$("#subwrapper").html("<h2>THAT IS RIGHT!!!</h2>")
		if(game.currentQuestion === questions.length-1){
			setTimeout(game.results, 3*1000);
		}else{
			setTimeout(game.nextQuestion, 3*1000);
		}
	},
	answeredIncorrectly: function(){
		clearInterval(timer);
		game.incorrect++;
		$("#subwrapper").html("<h2>WRONG ANSWER!!!</h2>");
		$("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correct_answer +" </h3>");
		if(game.currentQuestion === questions.length-1){
			setTimeout(game.results, 3*1000);
		}else{
			setTimeout(game.nextQuestion, 3*1000);
		}
	},
	reset: function(){
		game.currentQuestion = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.counter = 30;
		game.unanswered = 0;
		game.loadQuestion();
	}
}