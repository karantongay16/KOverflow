var editQuesModel = Backbone.Model.extend({

	urlRoot: '/api/questions',
	defaults: {
	quesid: "",
	title: "",
	contents: "",
	askedby: "",
	},
	idAttribute: "quesid"


});