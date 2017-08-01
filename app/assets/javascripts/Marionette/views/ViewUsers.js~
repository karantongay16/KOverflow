var viewUsers = Marionette.CollectionView.extend({

events: {
		"click .onfollow": "onFollow",
	},

initialize: function(){
	this.$el.empty();
	var stat = [];
	$.ajax({
		  url: '/api/app/listofusers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	stat = data[0];
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

this.showusers(stat);
},

showusers: function(stat){
	$(".viewheader").html("All Users<br><br>");
	this.$el.append("" +
	"<table class='table table-fixed' id='userstable'>" +
		"<tr>" +
		"<td>User</td>" +
		"<td>Follow / Unfollow</td>" +
		"</tr>");
	for (var i=0;i<stat.length;i++)
	{
	this.$("#userstable").append("" +
		"<tr>" +
		"<td>" +
		  "" + stat[i].email +
		"</td>" +
		"<td>" +
		"<button class='btn btn-success onfollow' username=" + stat[i].email +" id='" + stat[i].id + "' status=" + stat[i].follow + ">" + stat[i].follow + "</button>" +
		"</td></tr>");
	}
	this.$el.append("</table>");
	//debugger;
	return this;
},
	onFollow: function(e){
		var ele = $(e.currentTarget);
		console.log(ele.attr('id'));
		console.log(ele.attr('status'));
		if (ele.attr('status') === "Follow")
		{
		$.ajax({
		  url: '/users/' + ele.attr('id') + '/follow',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log(data);
		  	console.log("Followed");
		  	modalOpen();
				$(".bbm-modal__title").html("Great!");

				$(".bbm-modal__section").html("You are now following " + ele.attr('username'));
		    
		  },
		  error: function(e){

		  } });

		this.initialize();
		}
		if (ele.attr('status') === "Unfollow")
		{
		$.ajax({
		  url: '/users/' + ele.attr('id') + '/unfollow',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log("Unfollowed");
		  	modalOpen();
				$(".bbm-modal__title").html("Information!");

				$(".bbm-modal__section").html("You are now unfollowing " + ele.attr('username'));
		    
		    
		  },
		  error: function(e){

		  } });
		this.initialize();

		}

	}

});
