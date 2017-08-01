var useremail = "";

var newQues = Marionette.View.extend({

	model: newQuesModel,

	events: {
		"click .delete": "onDelete",
		"click .Show" : "onSubmit"
	},

	render: function(){
		$(".search-results").empty();
		$(".viewheader").html("Ask New Question<br><br>");
		this.$el.append("<div id='newques' style='background-color:lightcyan; box-shadow: 5px 7px 5px #888888; padding:20px; border-radius:15px;'></div>");
		this.$("#newques").append("<label>Title</label><br>" + 
			"<input type='text' id='title' placeholder='Minimum 5 Characters' class='form-control'><br>" +
			"<label>Description</label>" + 
			"<textarea class='form-control' rows=10 id='desc' placeholder='Please enter the description'></textarea><br><button class='Show btn btn-success' id='submitques'>Submit Question</button>");
		
		$.ajax({
		  url: '/api/questions/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    useremail = data;
		    
		  },
		  error: function(e){
		  	//console.log("Error");
		  } });


		return this;
	},

	onSubmit: function()
	{
		//console.log(useremail);
		//nqm = new newQuesModel({title: $("#title").val(), contents: $("#desc").val(), askedby: "" + useremail});
		nqm = new newQuesModel({title: $("#title").val(), contents: $("#desc").val(), askedby: "test@test.com"});
		//console.log(nqm);	
		//console.log("Attempting to save");
		nqm.save({},{
			success: function(model, response, options)
			{
				//modalOpen();
				//$(".bbm-modal__title").html("Success!");

				//$(".bbm-modal__section").html("Your Question Submitted Successfully!");

				console.log("Success");
				router.navigate("#qfeed");
				//window.location.reload();
				Backbone.history.loadUrl();
				
			},
			error: function(model,xhr,options)
			{
				console.log("Somthing Went Wrong");
				// modalOpen();
				// $(".bbm-modal__title").html("Information: Something went wrong!");

				// $(".bbm-modal__section").html("<p>Please check the following:</p>" +
				// 	"<li>The Title should have more than 5 characters!</li>" +
				// 	"<li>The Description should not be empty and should consist of at the least 5 characters!</li>");
			}
		});
		router.navigate("#qfeed");

		//console.log($("#title").val());
	}

});
