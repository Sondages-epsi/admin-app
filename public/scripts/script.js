$('#add').click(() =>{
	$('#questions tr:last').after('<tr class="question-row"><td><input type="text" id="question"></td><td><input type="text" id="answer1"></td><td><input type="text" id="answer2"></td><td><input type="text" id="answer3"></td </tr>')
})

$('#remove').click(() =>{
	$('#questions tr:last').remove()
})

$('#sendButton').click(() =>{
	let survey ={}
	let name = $('#name')
	let questions
	if(name){		
		survey.name = name
		questions = $('.question-row').map((i,tr) =>{
			return {
				question:$(tr).find('#question').val(),
				answer1:$(tr).find('#answer1').val(),
				answer2:$(tr).find('#answer2').val(),
				answer3:$(tr).find('#answer3').val()			
			}
		}).filter((i,question)=>{return isValidQuestion(question)}).get();
		if(questions.length >0){
			survey.questions = questions
			//$.post('/survey',survey);
		}else{
			//TODO ALERT
		}
	}else{
		//TODO ALERT
	}
})

function isValidQuestion(question){
	console.log(question)
	return question.question && question.answer1 && question.answer2 && question.answer3
}