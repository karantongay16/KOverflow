var newQuesModel = Backbone.Model.extend({

	urlRoot: '/api/questions/',
	defaults: {
	title: "this is Title",
	contents: "contents go here",
	askedby: "test@test.com",
	}

});