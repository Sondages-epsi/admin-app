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
	of: String
  }
});
const Survey = mongoose.model('Survey',surveySchema);
const responseSchema = new mongoose.Schema({ 
	user: String,
	responses:{
		type:Map,
		of: String
	}
});
const Response = new mongoose.model('Response',responseSchema);


function createSurvey(surveyData){
	return Promise.all([Survey.deleteMany({}),Response.deleteMany({})])
			.then(() =>{
				let survey = new Survey(surveyData)
				return survey.save().then(()=>{
					return surveyData
				})
			})
}

function addResponse(data){
	return Response.findOne({user : data.user}).then((result)=>{
		let newDoc = result
		if(result && result.user && result.responses){
			newDoc.responses.set(data.question,data.response)
		}else{
			newDoc = {
				user: data.user,
				responses: {[data.question]:data.response}
			}		
		}
		newDoc = new Response(newDoc)
		return newDoc.save().then((res)=>{
			return res;
		});
	});
}
// To get all surveys
app.get('/survey',(req,res)=>{
	return Survey.findOne({}).then((survey)=>{
		res.send(survey);
	}).catch(() =>{
		res.status(500).send('Error getting survey')
	});
});
app.post('/response',(req,res)=>{
	if(req && req.body && req.body.user && req.body.question && req.body.response){
		addResponse(req.body).then((result)=>{
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
	if(req && req.body && req.body.survey && req.body.survey.name && req.body.survey.questions){
		 createSurvey(req.body.survey).then((result) =>{
			res.send(result);
		 }).catch(()=>{
			res.status(500).send('Internal error')
		 })
	}else{
		res.send('Invalid parameters')
	}
});


//Listening
app.listen(PORT, () => console.log('Listening on port ' + PORT));