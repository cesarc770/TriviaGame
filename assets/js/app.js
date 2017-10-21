//we need to pull questions from an object
var queryUrl = "https://opentdb.com/api.php?amount=20&category=14&type=multiple";


//display question and answers, mark the answers for correct and incorrect
function display(question, answer1, answer2, answer3, answer4){
	var q = "<h1>" + question + "</h1>";
	var answer = [answer1, answer2, answer3, answer4];

	$("#question").html(q);

	for(var i = 0; i < answer.length; i++){
		var answerDiv = $("<div>");
		answerDiv.html(answer[i]);
		if(i === 0){
			answerDiv.addClass("correct options");
		}else{
			answerDiv.addClass("incorrect options");
		}
		$("#answers").append(answerDiv);
	}
}

//timer starts at 30 seconds
function setTimer(){
	var time = 30;
		setInterval(function(){ 
			while(time > 0){
				time = time -1;
				$("#timer").html(time);
				return time;
			}
	}, 1000);	
}


//when the user selects an aswer or when the timer runs out it goes to answer screen
function displayAnswerScreen(){
	
}
//on answer screen it shows if you got it right or wrong and show the correct answer and stays there for three seconds before going to next question
//next question is loaded again and and timer starts again at 30 seconds
//when all the questions have been answered it goes to the last page showing stats of right and wrong answers 
//if you click on start again button it resets the game wihtout reloading the page



