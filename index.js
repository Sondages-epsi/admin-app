const env = require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://'+process.env.DB_ADDRESS+'/'+process.env.DB_NAME,{useNewUrlParser: true})
const db = mongoose.connection;
app.use(bodyParser.json())
const surveySchema = new mongoose.Schema({  
  name:String,
  questions:{
	type:Map,
	of: Object
  }
});
const Survey = mongoose.model('Survey',surveySchema);
const answerSchema = new mongoose.Schema({ 
	user: String,
	answers:{
		type:Map,
		of: String
	}
});
const Answer = new mongoose.model('Answer',answerSchema);


function createSurvey(surveyData){
	if(checkSurvey(surveyData)){
		return Promise.all([Survey.deleteMany({}),Answer.deleteMany({})])
				.then(() =>{
					let survey = new Survey(surveyData)
					return survey.save().then(()=>{
						return surveyData
					})
				})
	}else{
		throw new Error('Invalid parameters')
	}
}
function checkSurvey(survey){
	return survey && survey.name &&	survey.questions;
}
function checkRequest(req){
	return req && req.body;
}
function checkAnswerObject(answer){
	return answer.user && answer.question && answer.answer;
}
function addAnswer(data){
	if(checkAnswerObject(data)){
		return Answer.findOne({user : data.user}).then((result)=>{
			let newDoc = result
			if(result && result.user && result.answers){
				newDoc.answers.set(data.question,data.answer)
			}else{
				newDoc = {
					user: data.user,
					answers: {[data.question]:data.answer}
				}		
			}
			newDoc = new Answer(newDoc)
			return newDoc.save().then((res)=>{
				return res;
			});
		});
	}else{
		throw new Error('Invalid parameters')
	}
}
// To get all surveys
app.get('/survey',(req,res)=>{
	return Survey.findOne({}).then((survey)=>{
		res.send(survey);
	}).catch(() =>{
		res.status(500).send('Error getting survey')
	});
});
app.post('/answer',(req,res)=>{
	if(checkRequest(req) && checkAnswerObject(req.body)){
		addAnswer(req.body).then((result)=>{
			res.send(result);
			return result;			
		}).catch((err)=>{			
			res.status(500).send('Internal error')
		})
	}else{
		res.status(500).send('Invalid parameters')
	}
});

app.post('/survey',(req,res)=>{
	if(checkRequest(req)){
		createSurvey(req.body.survey).then((result) =>{
			res.send(result);
		}).catch(()=>{
			res.status(500).send('Internal error')
		})	
	}else{
		res.status(500).send('Invalid parameters')
	}
});


//Listening
app.listen(PORT, () => console.log('Listening on port ' + PORT));