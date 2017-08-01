/* Default Router */

describe("Routing::", function(){
  var router;
  var spyevent;

  beforeEach(function(){
    router = new AppRouter({controller: myController});
    //spyevent = spyOn(router.controller, "viewQuesDesc");
    //Backbone.history.start();
    //router.navigate("qfeed", {trigger: true});

  });

  it("Default route should load 'viewFeed' view", function(){
    //var home = spyOn(router, 'viewFeed').andCallThrough();
    //view = new QuestionsView();
    //expect(view).toHaveBeenCalledOnce();
    expect(router.appRoutes[""]).toEqual('viewFeed');
  });
  it("qfeed route should load 'viewFeed' view", function(){
    expect(router.appRoutes["qfeed"]).toEqual('viewFeed');
  });
  it("newq route should load 'newQues' view", function(){
    expect(router.appRoutes["newq"]).toEqual('newQues');
  });
  it("profile route should load 'viewProfile' view", function(){
    expect(router.appRoutes["profile"]).toEqual('viewProfile');
  });
  it("users route should load 'viewUsers' view", function(){
    expect(router.appRoutes["users"]).toEqual('viewUsers');
  });
  it("qview/:id route should load 'newQues' view", function(){
    expect(router.appRoutes["qview/:id"]).toEqual('viewQuesDesc');
  });
  it("edit/:id route should load 'newQues' view", function(){
    expect(router.appRoutes["edit/:id"]).toEqual('editQues');
  });


});

/* */

newQmodel = Backbone.Model.extend({
  url: '/question'
});

editmodel = Backbone.Model.extend({

  url: 'edit',

  title: 'abcde',

  id: "1",

  desc: "contents"

});

Qcollection = Backbone.Collection.extend({
  Model: newQmodel
});

/* Model Specs */

describe('MODEL SPEC (New Question):: when title and description is absent', function () {
    var model;
    beforeEach(function () {
        model = new Question();
        errors = model.validate({});
    });

    it ('should have 2 errors', function () {
        expect(errors.length).toBe(2);
    });

    it ('should have title field as invalid', function () {
         expect(errors[0].toString()).toEqual("Please enter a valid title");
     });

     it ('should have description field as invalid', function () {
         expect(errors[1].toString()).toEqual("Please enter a valid description");
     });
});

describe('MODEL SPEC (New Question):: when title is present and description is absent', function () {
    var model;
    beforeEach(function () {
        model = new Question();
        errors = model.validate({title: 'This is the title'});

    });

    it ('should have 1 error', function () {
        expect(errors.length).toBe(1);
    });

    it ('should have description field as invalid', function () {
         expect(errors[0].toString()).toEqual("Please enter a valid description");
     });
});

describe('MODEL SPEC (New Question):: when description is present and title is absent', function () {
    var model;
    beforeEach(function () {
        model = new Question();
        errors = model.validate({desc: "This is the description"});
    });

    it ('should have 1 error', function () {
        expect(errors.length).toBe(1);
    });

    it ('should have title field as invalid', function () {
         expect(errors[0].toString()).toEqual("Please enter a valid title");
     });
});

describe("MODEL SPEC (New Question):: when saving a question model", function() {

    var modelview;
    //var server;
    beforeEach(function() {
      modelview = new Question();
      eventSpy = sinon.spy(modelview,"save");
      this.server = sinon.fakeServer.create();
      this.responseBody = '{"desc":"test user","id":212,"title":"tester"}';
      this.server.respondWith("POST", "/q", 
        [
          200,
          {"Content-Type": "application/json"},
          this.responseBody
        ]
      );
    });
   

    afterEach(function() {
      this.server.restore();
    });

    it("should not save when title is blank", function() {
      
      modelview.bind("error", eventSpy);
      modelview.save({"title": ""});
      //console.log(this.server.requests);
      expect(eventSpy).toHaveBeenCalledOnce();    
      expect(eventSpy).toHaveBeenCalledWith({"title":""}); //expect Model is called with method save
    });

    it("should call the server", function() {
      modelview.save({"title":"tester", "desc":"test user"});

      console.log(this.server.requests);

      expect(this.server.requests[0].method).toEqual("POST");
      expect(JSON.parse(this.server.requests[0].requestBody)).toEqual(modelview.attributes);

      // this.router = new AppRouter({controller: myController});
      // this.router.navigate("qfeed", true);
      //expect($('.view').attr('id')).toEqual('1');
    });

    it("should update the model collection", function(){

      var ques = [];
      var c = new Question({"title":"tester", "desc":"test user"});
      ques.push(c);

      col = new Questions(ques);

      expect(col.length).toEqual(1);

    });

  });

describe('Main1.js spec', function () {
    var view, model;

    beforeEach(function () {
        view = new newQues();
    });

    describe('when New Question View is constructing', function () {

        it ('should exist', function () {
            expect(view).toBeDefined();
        });

    });
  });


/* View Specs */

describe('VIEW SPEC:: when New Question View is rendered', function () {

    beforeEach(function () {
      view = new newQues();
        view.render();
    });

    it ('should question title field be empty', function () {
          $("#title").attr("value","hi");
          expect($("#title")).toBeDefined();
          expect($("#title").val()).toEqual(undefined);
         //expect(view.$el.find('input#title')).toContain('');
    });

    it ('should question description field be empty', function () {
          expect($("textarea#desc").val()).toEqual(undefined);
    });

});


describe('VIEW SPEC:: when New Question Form is submitted', function () {

  beforeEach(function () {
    this.server = sinon.fakeServer.create();
    this.responseBody = '{"desc":"test user","id":212,"title":"tester"}';
    this.server.respondWith("POST", "/q", 
      [
        200,
        {"Content-Type": "application/json"},
        this.responseBody
      ]
    );
  });

    describe('no inputs are filled', function () {

        beforeEach(function () {
            view = new newQues();
            view.render();
            view.$el.find('#title').val('').trigger('change');
            view.$el.find('#desc').val('').trigger('change');
        });

        beforeEach(function () {
            view.$el.find('#submit').trigger('click');
        });

        it('Modal containing validation issues should appear', function () {
            expect(view.$el.find('.bbm-modal')).toBeDefined();
        });

    });

    describe('all inputs are filled', function () {

        beforeEach(function () {
            view1 = new newQues();
            view1.render();
            view1.$el.find('#title').val('This is the title?');
            view1.$el.find('#desc').val('This is the test description?');
            //view1.model.set({"askedby" : "test@test.com"});
        });

        beforeEach(function () {
            
        });

        it("should redirect to index page", function(){

          var temp = view1.$el.find('#submitques');
          
          eventSpy = sinon.spy(temp,"click");
          temp.click();

          expect(Backbone.history.getFragment()).toContain("qfeed");

        });
        
    });

  });