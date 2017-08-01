// Create a modal view class
var Modal = Backbone.Modal.extend({
    template: '#modal-template',
    cancelEl: '.bbm-button',
});

var deleteModal = Backbone.Modal.extend({
    template: '#delete-modal-template',
    cancelEl: '.bbm-button',
});

function modalOpen(){
// Render an instance of your modal
var modalView = new Modal();
$('.app').html(modalView.render().el);
}

function deletemodalOpen(){
// Render an instance of your modal
var modalView = new deleteModal();
$('.app').html(modalView.render().el);
}

var bus = _.extend({}, Backbone.Events); // Event Bus

myController = new MyController(); //From Marionette/controllers/Controller.js
var router = new AppRouter({controller: myController}); // From Marionette/routers/AppRouter.js

var app = new App();  // From Marionette/StartApp.js

  // The "app" dependency is passed in as "App"
  $(document).ready(function(){
    $("#cont").attr("style","padding-bottom:100px;");
    app.start();
    $('a').click(function(e){
        var t = $(e.target);
        Backbone.history.navigate(t.attr("data-url"), {trigger: true});
    })

    var temp = 0;
    $('#notifylink').click(function(e){
      console.log(e);
      e.preventDefault();
      if (temp == 1)
      {
        $('#notificationsBody').empty();
        $('#notificationsBody').append("<center>All Caught Up!</center>");
        $("#msg_count").empty();
        $("#msg_count").html("0");
        //$("#msg_count").fadeOut("slow");
      }
      //$('#msg_count').empty("");
      temp = 1;

      $.ajax({
        url: '/notify/remove/',
        dataType: 'json',
        type: 'DELETE',
        async: false,
        success: function (data) {
          //console.log(data[0].length);
        },
        error: function(e){
          console.log("Error");
        } });

      return false;

    });
    var data = [];
    $.ajax({
      url: '/notify/send/',
      dataType: 'json',
      async: false,
      success: function (data1) {
        data = data1;
        
      },
      error: function(e){
        //console.log("Error");
      } }).done(function(){
        $('#msg_count').append("" + data[0].length);
        if(data[0].length >= 1)
        {
        //Qdata = data[0];
          for (var i=0; i<data[0].length; i++)
          {
            $('#notificationsBody').append(data[0][i].contents + "<br>");
          }
        }
        if(data[0].length == 0)
        {
          //$("#msg_count").fadeOut("slow");
          $('#notificationsBody').append("<center>All Caught Up!</center>");
        }
      });

    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

});



// $(document).ready(function(){
//     $("#cont").attr("style","padding-bottom:100px;");
//     app.start();
//     $('a').click(function(e){
//         var t = $(e.target);
//         Backbone.history.navigate(t.attr("data-url"), {trigger: true});
//     })

//     $(window).load(function(){
//         $('#preloader').fadeOut('slow',function(){$(this).remove();});
//     });

// });