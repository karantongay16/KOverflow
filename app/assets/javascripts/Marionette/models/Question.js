var Question = Backbone.Model.extend({

	idAttribute: "reg",

	title: "",

	desc: "",

	urlRoot: "/api/questions",

	validate: function(attrs){
		var error = [];
		if (!attrs.title && !attrs.desc)
		{
			//error.empty();
			error.push("Please enter a valid title");
			error.push("Please enter a valid description");
			return error;
		}
		if(!attrs.title)
		{
			error.push("Please enter a valid title");
			return error;
		}
		if(!attrs.desc)
		{
			error.push("Please enter a valid description");
			return error;
		}
	},

	start: function(){
		console.log("Question started.");
	}
});
