var quesid = 0;
var QuesDescView = Marionette.CollectionView.extend({

// Contents for displaying the question description goes here

events: {
"click #delete_question" : "deleteQues",
"click #submitanswer" : "submitAns",
"click .deleteAns" : "deleteAnswer",
"click #edit_question" : "editQuestion"
},

submitAns: function(){

	if ($("#anscontents").val().length < 5)
	{
		modalOpen();
		$(".bbm-modal__title").html("Information!");
		$(".bbm-modal__section").html("Answer Should be Minimum of 5 Characters");
		return;
	}
	nqm = new AnsModel({poster: $("#email").val(), contents: $("#anscontents").val(), answeredby: "" + $("#email").val()});
		console.log(nqm);	
		console.log("Attempting to save");
		nqm.save({},
			{
			url: "/questions/" + quesid + "/answers"
			},
			{
				dataType: 'text'
			},
			{
				success: function()
				{
					console.log("Model Saved");
				},
				error: function(model,xhr,options)
				{
					console.log("Somthing Went Wrong");
				}
			});

		myController.loadView(new QuesDescView({quesid}));

		var data=[];

		$.ajax({
		  url: '/notify/send/',
		  dataType: 'json',
		  async: false,
		  success: function (data1) {
		  	data = data1;
		  },
		  error: function(e){
		    console.log("Error");
		  } }).done(function(){
		  	$('#msg_count').empty();
		    $('#msg_count').html("" + data[0].length);
		    if(data[0].length >= 1)
		    {
		    //Qdata = data[0];
		    $('#notificationsBody').append(data[0][0].contents + "<br>");
		    }
		    if(data[0].length == 0)
		    {
		      $('#notificationsBody').append("<center>All Caught Up!</center>");
		    }
		  });
},

editQuestion: function(e){
	var ele = $(e.currentTarget);
	var str = "edit/" + quesid;
	Backbone.history.navigate(str, {trigger: true});
	//myController.loadView(new editQues(ele.attr('id')));
},

deleteAnswer: function(e){

	console.log("Deleting");
	var ele = $(e.currentTarget);
	//console.log(ele.attr('id'));
	ques = new AnsModel({id: ele.attr('id')});
	$(".bbm-modal__title").html("Alert");
	ques.destroy({
		url: "/questions/" + quesid + "/answers" + "/" + ele.attr('id'),
		success: function () {
		    console.log("success");
		    modalOpen();
		  	$(".bbm-modal__title").html("Success!");

		  	$(".bbm-modal__section").html("Your answer deleted successfully!");

		  	if (this._currentView) {
			this._currentView.remove();
		}
	//router.loadView(new QuesDescView({quesid}));
	myController.loadView(new QuesDescView({quesid}));

		  },
		  error: function(e){
		  	//alert("You cannot delete someone else's answer!");

		  	modalOpen();
		  	$(".bbm-modal__title").html("Information");

		  	$(".bbm-modal__section").html("You cannot delete the answer submitted by another User!");

		  	//$('.open').click();
		  }});

	
},

initialize: function (options) {
		
		console.log(options);
        this.ques = new QuesCollection();
        this.ques.id = options.quesid;
        this.ques.fetch();
        quesid = this.ques.id;	

        this.$el.empty();

        this.show(this.ques.id);
    },

deleteQues: function()
{
	console.log("Deleting");
	ques = new QuesDesc({id: quesid});
	//_.invoke(this.ques, 'destroy');
	//q = new QuesDesc();

	  deletemodalOpen();
		$(".bbm-modal__title").html("Alert!");

		$(".bbm-modal__section").html("Are You Sure, you want to delete this question? <br> This action is irreversible!");

		var deleteflag = 0;
		$("#delete").click(function(){
		    ques.destroy({
		    		url: "/questions/" + quesid,
		    		dataType: 'json',
		    		success: function () {
		    		   
		    		   //alert("Your Question deleted successfully!");
		    		    modalOpen();
		    		  	$(".bbm-modal__title").html("Success!");

		    		  	$(".bbm-modal__section").html("Your Question deleted successfully!");

		    		    Backbone.history.navigate("#qfeed", {trigger: true});
		    			//Backbone.history.loadUrl();
		    			//window.location.reload();
		    		  },
		    		  error: function(e){
		    		  	//alert("You cannot delete someone else's question!")
		    		  	modalOpen();
		    		  	$(".bbm-modal__title").html("Information");

		    		  	$(".bbm-modal__section").html("You cannot delete the Question submitted by another User!");

		    		  }});
		});

/*
	ques.destroy({
		url: "/questions/" + quesid,
		dataType: 'json',
		success: function () {
		   
		   alert("Your Question deleted successfully!");
		   //  modalOpen();
		  	// $(".bbm-modal__title").html("Success!");

		  	// $(".bbm-modal__section").html("Your Question deleted successfully!");

		    router.navigate("#qfeed");
			//Backbone.history.loadUrl();
			window.location.reload();
		  },
		  error: function(e){
		  	//alert("You cannot delete someone else's question!")
		  	modalOpen();
		  	$(".bbm-modal__title").html("Information");

		  	$(".bbm-modal__section").html("You cannot delete the Question submitted by another User!");

		  }});
		  */
},

show: function(quesid){
	$(".viewheader").html("");
	this.ques = new QuesCollection();
	var q = new Question();
		var item1 = [];
		
		$.ajax({
		  url: '/questions/' + quesid,
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    //questions = new Question.Collections.Questions(data[0]);
		    //var m = new Question(data, {parse: true});
		    for (var i=0; i<data.length; i++)
		    {
		    	item1 = data[i];
		    	//console.log(item1.askedby);
		    		
		    }
		  } });

		this.$el.append("<h2 class='h2'>Question: " + item1.title + "</h2>");
		this.$el.append("Asked By: " + item1.askedby);
		this.$el.append(" | Created On: " + item1.created_at + "<br><br>");

		this.$el.append("" +
			"<div class='desc' style='background-color:lightcyan; box-shadow: 5px 7px 5px #888888; height:30%; border-radius:15px; padding: 25px;'>");

		var str = item1.contents;

		//str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');

		this.$(".desc").append("<u>Description:</u> <br><br>" + str +"");
		
		this.$el.append("<div id='formbtn'></div>");

		//this.$("#formbtn").append("<br><a class='btn btn-warning' id='edit_question' rel='nofollow'>Edit This Question</a>");


		$.ajax({
		  url: '/api/questions/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    useremail = data;
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

		console.log();
		if(useremail[0] === item1.askedby)
		{
		this.$("#formbtn").append("<br><a class='btn btn-danger' id='delete_question' rel='nofollow'>Delete This Question</a>");

		this.$(".desc").append("<br><br><a class='btn btn-warning' id='edit_question' rel='nofollow'>Edit This Question</a>");
		}

		this.$el.append("<br><div class='answer' style='background-color:lightblue; height:320px; padding:25px; border-radius:25px;'>");

		

		this.$(".answer").append("<label>Poster</label><br>" +
			"<input type='text' value=" + useremail + " id='email' class='form-control' readonly='true'><br>" + 
			"<label>Your Answer</label><br>" +
			"<textarea class='form-control' id='anscontents'></textarea><br>" +
			"<button class='btn btn-success' id='submitanswer'>Submit Answer</button>");


		var answers = [];
		var answeredby = [];
		var answereddate = [];
		var answerid = [];

		$.ajax({
		  url: '/questions/' + quesid +'/answers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	//console.log(data[0]);
		    for(var i=0;i<data[0].length;i++)
		    {
		    	answers[i] = data[0][i].contents;
		    	answeredby[i] = data[0][i].answeredby;
		    	answereddate[i] = data[0][i].created_at;
		    	answerid[i] = data[0][i].id;
		    }
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });


		for(var i=0;i<answers.length;i++)
		{
		 this.$el.append("<br><br>" +
		    	"<div class='answer' style='background-color:lightblue; height:220px; padding:20px; border-radius:25px;'>" +
  				   "<p>" +
				    "<strong>Answer: </strong>" +
				    "" + answers[i] +
				  "</p>" +
				  "<br><br>" +
				  "<p>" +
				    "<strong>Poster: </strong>" +
				    "" + answeredby[i] +" | <strong>Answered: </strong>" + answereddate[i] +
				  "</p>" +
				 
				  "<p>" +
				  "<br>" +
				  "<button class='btn btn-danger deleteAns' id='" + answerid[i] + "'>Delete Answer</button>" +
				"</p>" +
				"</div>" + 
		    	"");
		}

		return this;
	}

});
