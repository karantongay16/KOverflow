var AppRouter = Marionette.AppRouter.extend({
	appRoutes: {	
		"qfeed": "viewFeed",
		"newq": "newQues",
		"qview/:id": "viewQuesDesc",
		"profile": "viewProfile",
		"users": "viewUsers",
		"edit/:id": "editQues",
		"*default": "viewFeed",
		"": "viewFeed",
		"notify": "notify"
	},
 
});