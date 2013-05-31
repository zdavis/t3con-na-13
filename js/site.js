(function() {
  var addView, debugView, itemCollection, itemModel, listView, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  itemModel = (function(_super) {
    __extends(itemModel, _super);

    function itemModel() {
      _ref = itemModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return itemModel;

  })(Backbone.Model);

  itemCollection = (function(_super) {
    __extends(itemCollection, _super);

    function itemCollection() {
      _ref1 = itemCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    itemCollection.prototype.model = itemModel;

    return itemCollection;

  })(Backbone.Collection);

  debugView = (function(_super) {
    __extends(debugView, _super);

    function debugView() {
      _ref2 = debugView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    debugView.prototype.initialize = function() {
      this.collection.bind('add', this.render, this);
      this.collection.bind('remove', this.render, this);
      return this.render();
    };

    debugView.prototype.render = function() {
      var json;

      json = this.collection.toJSON();
      return this.$el.html(JSON.stringify(json));
    };

    return debugView;

  })(Backbone.View);

  listView = (function(_super) {
    __extends(listView, _super);

    function listView() {
      _ref3 = listView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    listView.prototype.events = {
      'click li': 'removeItem'
    };

    listView.prototype.template = $('#listViewTemplate').html();

    listView.prototype.removeItem = function(e) {
      var id;

      id = $(e.currentTarget).data().item;
      this.collection.remove(this.collection.get(id));
      return console.log(this.collection.length);
    };

    listView.prototype.initialize = function(options) {
      this.collection.bind('add', this.render, this);
      return this.collection.bind('remove', this.render, this);
    };

    listView.prototype.render = function() {
      return this.$el.html(_.template(this.template, {
        items: this.collection
      }));
    };

    return listView;

  })(Backbone.View);

  addView = (function(_super) {
    __extends(addView, _super);

    function addView() {
      _ref4 = addView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    addView.prototype.events = {
      'submit #new-model-form': 'addItem'
    };

    addView.prototype.template = $('#addViewTemplate').html();

    addView.prototype.addItem = function(e) {
      var input, item, name;

      e.preventDefault();
      input = this.$el.find('#new-model');
      name = input.val();
      if (name != null) {
        input.val('');
        item = new itemModel({
          name: name,
          id: _.uniqueId()
        });
        return this.collection.add(item);
      }
    };

    addView.prototype.initialize = function(options) {};

    addView.prototype.render = function() {
      return this.$el.html(_.template(this.template, {
        items: this.collection
      }));
    };

    return addView;

  })(Backbone.View);

  $(function() {
    var items;

    items = new itemCollection([
      {
        name: 'Wordsworth',
        id: _.uniqueId()
      }, {
        name: 'Shelley',
        id: _.uniqueId()
      }
    ]);
    listView = new listView({
      collection: items,
      el: $('[data-view="list"]')
    }).render();
    addView = new addView({
      collection: items,
      el: $('[data-view="add"]')
    }).render();
    return debugView = new debugView({
      collection: items,
      el: $('[data-view="debug"]')
    }).render();
  });

}).call(this);
