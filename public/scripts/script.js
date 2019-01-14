$('#add').click(() =>{
	$('#questions tr:last').after('<tr class="question-row"><td><input type="text" id="question"></td><td><input type="text" id="answer1"></td><td><input type="text" id="answer2"></td><td><input type="text" id="answer3"></td </tr>')
})

$('#remove').click(() =>{
	$('#questions tr:last').remove()
})

$('#sendButton').click(() =>{
	let survey ={}
	let name = $('#name').val()
	let questions
	if(name){		
		survey.name = name
		questions = $('.question-row').map((i,tr) =>{
			return {
				question:$(tr).find('#question').val(),
				answers:{
					1:$(tr).find('#answer1').val(),
					2:$(tr).find('#answer2').val(),
					3:$(tr).find('#answer3').val()		
				}	
			}
		}).filter((i,question)=>{
			return isValidQuestion(question)
		}).get().reduce((obj,curr,i)=>{
			obj[i] = curr;
			return obj;
		},{})
		if(questions[0]){
			survey.questions = questions
			$.ajax( {url:'/survey',type:'POST', data:JSON.stringify(survey),contentType: 'application/json; charset=utf-8'}).then(resp => {M.toast({html: 'Survey added'})}).catch(err => M.toast({html: 'Error adding survey'}))
		}else{
			M.toast({html: 'Please add at least one question'})
		}
	}else{
		M.toast({html: 'Please select a survey name'})
	}
})


function isValidQuestion(question){
	return question.question && question.answers && question.answers[1] && question.answers[2] && question.answers[3]
}