var viewProfile = Marionette.CollectionView.extend({
	events: {
		"click .gotoquestion": "goToQuestion",
		"click .gotoanswer" : "goToAnswer"
		//"click .Show" : "onSubmit"
	},
	initialize: function()
	{
		this.$el.empty();
		var quesasked = "";
		var answers = "";
		var followers = [];
		var following = [];
		var myquestions = [];
		var myquestionid = [];
		var answercount = [];
		var myanswers = [];
		var myanswerid = [];
		var answeredto = [];

		info = {};
		$.ajax({
		  url: '/profiles/',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    info = data;
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

		$.ajax({
		  url: '/api/app/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    loginemail = data[0];
		    quesasked = data[1];
		    answers = data[2];
		    //console.log(data);
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

		$.ajax({
		  url: '/api/app/sendfollows',
		  dataType: 'json',
		  async: false,
		  success: function (data) {

		  	for(var i=0;i<data[0].length;i++)
		  	{
		  		followers.push(data[0][i].email);
		  		followers.push("<br>");
		  	}
		  	
		  	for(var i=0;i<data[1].length;i++)
		  	{
		  		following.push(data[1][i].email);
		  		following.push("<br>");
		  	}
		    
		  },
		  error: function(e){
		  	console.log(e);
		  } });


		$.ajax({
		  url: '/api/app/sendquestions',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    for(var i=0;i<data[0].length;i++)
		  	{
		  		myquestions[i] = data[0][i].title;
		  		myquestionid[i] = data[0][i].id;
		  		answercount[i] = data[0][i].ans_count;
		  		//myquestions.push(data[0][i].title);
		  		//myquestions.push("<br>");
		  	}
		  	
		    
		  },
		  error: function(e){
		  	
		  } });

		$.ajax({
		  url: '/api/app/sendanswers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log(data);
		    for(var i=0;i<data.length;i++)
		  	{
		  		 myanswers[i] = data[i].question_title;
		  		 myanswerid[i] = data[i].id;
		  		 answeredto[i] = data[i].askedby;
		  		// myanswers.push(data[i][j].title);
		  		// myanswers.push("<br>");
		  	}
		  },

		  error: function(e){
		  	console.log("Error");
		  } });



		this.show(info,loginemail,quesasked,answers,followers,following,myquestions,answercount,myanswers,myquestionid,myanswerid,answeredto);
	},

	show: function(info,loginemail,quesasked,answers,followers,following,myquestions,answercount,myanswers,myquestionid,myanswerid,answeredto){
		$(".viewheader").html("My Profile<br><br>");
		this.$el.append("" +
			"<div class='col-md-4 content-right' style='float: left;''>" +
					"<div class='cntnt-img'>" +
					"</div>" +
					"<div class='bnr-img'>" +
						"<img src='../assets/profile-img.png' width=165px height=165px alt=''/>" +
					"</div>" +
					"<div class='bnr-text'>" +
						"<h1>Quick Stats</h1>" +
						
					"</div>" +
					"<div class='btm-num'>" +
						"<ul>" +
							"<li>" +
								"<h4>" + info[0] +"</h4>" +
								"<h5>Following</h5>" +
							"</li>" +
							"<li>" +
								"<h4>" + info[1] +"</h4>" +
								"<h5>Followers</h5>" +
							"</li>" +
							"<li>" +
								"<h4>" + info[2] +"</h4>" +
								"<h5>Answers</h5>" +
							"</li>" +
						"</ul>" +
					"</div>" +				
				"</div>" +
				"</center>");

		//console.log(loginemail);
		this.$el.append("" +
			"<div class='col-md-4' style='position:relative; float:left; background-color: lightgreen; padding-top:10px; width: 450px;height: 385px;'>" +
				"<div class='bnr-num'>" +
					"<center><img src='../assets/details-img.png' width=160px height=160px alt=''/>" +
					"<br><br>" +
					"Details</center>" +
					"</div>" +
					"<table class='table'>" +
					"<tr>" +
					"<td>" +
					"Registered Email: " +
					"</td>" +
					"<td>" +
					""+ loginemail +
					"</td>" +
					"</tr>" +
					"<tr>" +
					"<td>" +
					"No of Questions asked: " +
					"</td>" +
					"<td>" +
					"" + quesasked +
					"</td>" +
					"</tr>" +
					"<tr>" +
					"<td>" +
					"No of Questions Answered: " +
					"</td>" +
					"<td>" +
					"" + answers +
					"</td>" +
					"</tr>" +
					"<br>" +
					"</table>" +
					"</div>" +
			"");


		this.$el.append("" +
			"<div class='col-md-2' style='position:relative; float:left; background-color: #b3f2fd; padding-top:10px; width: 310px;height: 200px;'>" +
			"Followers:" +
			"<br><br>" +
			"" + followers.join("") +
			"<br><br><br><br><br><br>" +
			"</div>" +
			"<div class='col-md-2' style='position:relative; border:thin yellow; overflow:auto; float:left; background-color: #b3f2fd; padding-top:10px; width: 310px; height: 185px;'>" +
			"Following:" +
			"<br><br>" +
			"" + following.join("") +
			"</div>" +
			"<div class='clearfix'> </div>" +
			"<br><br>");

		this.$el.append("" +
			"<h3 class='h3'>My Questions</h3>" +
			"<br>");
		this.$el.append("<table class=table id='questab'><tr><th>Question Title</th><th>No of Answers Received</th><th>Go To Question</th></tr>");
		for (var i=0;i<myquestions.length; i++)
		{
			this.$('#questab').append("<tr><td>" +
			"<a id=" + myquestionid[i] +" class='gotoquestion'> " + myquestions[i] + "</a>" +
			"</td><td>" + answercount[i] +"</td><td><button class='view gotoquestion btn btn-success' id=" + myquestionid[i] + ">View</button></td>");
		}
		this.$el.append("" +
			"<h3 class='h3'>My Answers</h3>" +
			"<br>");
		this.$el.append("<table class=table id='anstab'><tr><th>Question Answered</th><th>Asked By</th><th>Go To Answer</th></tr>");
		for (var i=0;i<myanswers.length; i++)
		{
			this.$('#anstab').append("<tr><td>" +
			"<a id=" + myanswerid[i] + " class='gotoanswer'>" + myanswers[i] + "</a>" +
			"</td><td>" + answeredto[i] + "</td><td><button class='view gotoanswer btn btn-success' id=" + myanswerid[i] + ">View</button></td>");
		}

		return this;
	},
	goToQuestion: function(e){
		var t = $(e.target);
		var id = t.attr("id");
		Backbone.history.navigate('qview/' + id, {trigger: true});
	},
	goToAnswer: function(e){
		var t = $(e.target);
		var id = t.attr("id");
		Backbone.history.navigate('qview/' + id, {trigger: true});
	}
});
