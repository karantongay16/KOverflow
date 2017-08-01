var MyController = Marionette.Object.extend({

  initialize: function(){
  	
  },
  notify: function(){
  	//this.$el.hide();
  	debugger;
  	console.log("hi");
  	return false;
  },
  editQues: function(id){
  	this.loadView(new editQues({quesid: id}));
  },
  viewUsers: function(){

		this.loadView(new viewUsers());
	},

	viewProfile: function(){
		this.loadView(new viewProfile());
	},

	viewQuesDesc: function(id){
		this.loadView(new QuesDescView({quesid: id}));
	},

	newQues: function(){
		console.log("Clicked");
		this.loadView(new newQues());
	},

	viewFeed: function(){
		this.loadView(new QuestionsView());
		$('#Questions').DataTable();
	},

	viewHome: function(){
		this.loadView(new HomeView());
	},

	loadView: function(view){
		// If the currentView is set, remove it explicitly.
		if (this._currentView) {
			//debugger;
			this._currentView.remove();
		}
		$("#cont").html(view.render().el);
		
		this._currentView = view;
	},

	defaultRoute: function(){
		console.log("Default");
	}
});
