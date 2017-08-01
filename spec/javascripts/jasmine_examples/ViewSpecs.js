/* View Specs */

describe('when New Question View is rendered', function () {

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


describe('when New Question Form is submitted', function () {

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

    describe('and no inputs are filled', function () {

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

    describe('and all inputs are filled', function () {

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