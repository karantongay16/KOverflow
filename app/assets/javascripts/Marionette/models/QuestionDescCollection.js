var QuesCollection = Backbone.Collection.extend({
    id: '',
    title: '',
    model: QuesDesc,  
    url: function () {
        return '/app/#qview/' + this.id;
    }
});
