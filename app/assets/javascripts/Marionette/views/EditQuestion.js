var Qdata;
var questionid;
var editQues = Marionette.View.extend({

  model: editQuesModel,

  events: {
    "click .delete": "onDelete",
    "click .Show" : "onSubmit"
  },

  initialize: function (options) {
        this.ques = new QuesCollection();
        this.ques.id = options.quesid;
        this.ques.fetch();
        //questionid = this.ques.id;
        questionid = this.ques.id;
        this.render(this.ques.id);
  },

  render: function(quesid){

    this.$el.empty();

    $.ajax({
      url: '/api/questions/edit/' + questionid,
      dataType: 'json',
      async: false,
      success: function (data) {
        console.log(data[0].contents);
        Qdata = data[0];
        
      },
      error: function(e){
        console.log("Error");
      } });

    $(".search-results").empty();
    $(".viewheader").html("Edit Question<br><br>");
    var str = Qdata.title;
    console.log(str); 
    this.$el.append("<div id='newques' style='background-color:lightcyan; box-shadow: 5px 7px 5px #888888; padding:20px; border-radius:15px;'></div>");
    this.$("#newques").append("<label>Title</label><br>" + 
      "<input type='text' id='title' value='" + str + "' placeholder='Minimum 5 Characters' class='form-control'><br>" +
      "<label>Description</label>" + 
      "<textarea class='form-control' rows=10 id='desc' placeholder='Please enter the description'>" + Qdata.contents + "</textarea><br><button class='Show btn btn-success' id='submitques'>Edit Question</button>");
    
    return this;
  },

  onSubmit: function()
  {
    nqm = new editQuesModel({quesid: questionid, title: $('#title').val(), contents: $('#desc').val(), askedby: "karan@test.com"});
    //nqm = new editQuesModel({quesid: questionid});
    console.log(nqm);
    console.log("Attempting to update");
    //nqm.fetch()

    var oData = {model : nqm.toJSON() };


    $.ajax({
      url: '/api/questions/' + questionid,
      dataType: 'json',
      type: 'POST',
      contentType: "application/json",
      async: false,
      data: JSON.stringify(nqm),
      success: function (data) {
       //console.log("Saved:" + data);
      },
      error: function(e){
        console.log("Error");
      } }).done(function( msg ) {
});
          modalOpen();
          $(".bbm-modal__title").html("Information!");

          $(".bbm-modal__section").html("Your Question is edited!");

          Backbone.history.navigate("qfeed", {trigger: true});

    // nqm.fetch({
    //     success: function (Response) {
    //         console.log("Found the question: " + Response.get("title"));
    //         // Let us update this retreived book now (doing it in the callback) [UPDATE]
    //          Response.set("title", $("#title").val());
    //          Response.set("contents", $("#desc").val());
    //          Response.set("askedby", "karan@test.com");

    //          Response.save({}, {
    //              success: function (model, response, options) {
    //                  console.log("The model has been updated to the server");
    //              },
    //              error: function (model, xhr, options) {
    //                  console.log("Something went wrong while updating the model");
    //              }
    //          });
    //     }
    // });

/*
    nqm.save({},{
      success: function(model, response, options)
      {
        //modalOpen();
        //$(".bbm-modal__title").html("Success!");

        //$(".bbm-modal__section").html("Your Question Submitted Successfully!");

        
        router.navigate("#qfeed");
        window.location.reload();
        Backbone.history.loadUrl();
        
      },
      error: function(model,xhr,options)
      {
        console.log("Somthing Went Wrong");
        modalOpen();
        $(".bbm-modal__title").html("Information: Something went wrong!");

        $(".bbm-modal__section").html("<p>Please check the following:</p>" +
          "<li>The Title should have more than 5 characters!</li>" +
          "<li>The Description should not be empty and should consist of at the least 5 characters!</li>");
      }
    });
    */

    //console.log($("#title").val());
  }

});
