function quesview()
{
 	var ques = [];
 	$.ajax({
		  url: '/questions',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    //questions = new Question.Collections.Questions(data[0]);
		    var m = new Question(data, {parse: true});
		    for (var i=0; i<data.length; i++)
		    {
		    	var items = data[i];
		    		for (var j=0;j<items.length;j++)
		    		{
		    			item = items[j];
		    			var c = new Question({title: item.title, askedby: item.askedby, id: item.id});
		    			ques.push(c);
		    		}
		    }
		  } });
 	return ques;
}

var QuestionsView = Marionette.CollectionView.extend({
	id: "Questions",

	tagName: "table",

	className: "table table-bordered table-hover",

	initialize: function(){
		this.$el.empty();
		$(".search-results").empty();
		$(".viewheader").html("Question Feed<br><br>");
		this.$el.append("<thead><tr><td>Title</td><td>Asked By</td><td>View Question</td></tr></thead>");
		bus.on("newQuestion", this.onNewQuestion, this);
		this.trigger('reset');
	},

	render: function(){
		var ques = quesview();
		var questions = new Questions(ques);
		questions.each(function(question){
			//this.loadView(new QuestionsView({ collection: questions }));
			var questionView = new QuestionView({ model: question });
			//->
			this.$el.append(questionView.render().$el);
		}, this);
	     

		return this;
	},

});
