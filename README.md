# admin-app
page d'administration des sondages


example adding survey
{
	"survey":{
		"name": "surveyTest",
	    "questions": {
	        "1": {
	        	"question":"Question 1 ?",
	        	"answers":{
	        		"1":"a1",
	        		"2":"a2",
	        		"3":"a3"
	        	}
	        	},
	        "2": {
	        	"question":"Question 2 ?",
	        	"answers":{
	        		"1":"a8",
	        		"2":"a1",
	        		"3":"a9"
	        		
	        	}
	        }
		 }
    }
}

example adding response
{
		"user": "surveyTest",
		"question":"1",
		"answer":"3"
}