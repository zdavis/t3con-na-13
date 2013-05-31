class itemModel extends Backbone.Model


class itemCollection extends Backbone.Collection
	model: itemModel


class debugView extends Backbone.View

	initialize: ->
		@collection.bind('add', @render, @)
		@collection.bind('remove', @render, @)
		@render()

	render: ->
		json = @collection.toJSON()
		@$el.html(JSON.stringify(json))

class listView extends Backbone.View

	events: 
		'click li':	'removeItem'

	template: $('#listViewTemplate').html()

	removeItem: (e) ->
		id = $(e.currentTarget).data().item
		@collection.remove(@collection.get(id))
		console.log @collection.length

	initialize: (options) ->
		@collection.bind('add', @render, @)
		@collection.bind('remove', @render, @)

	render: () ->
		@.$el.html(_.template(@template, {items: @collection}))

class addView extends Backbone.View

	events:
		'submit #new-model-form': 'addItem'

	template: $('#addViewTemplate').html()

	addItem: (e) ->
		e.preventDefault()
		input = @$el.find('#new-model')
		name = input.val()
		if name?
			input.val('')
			item = new itemModel({name: name, id: _.uniqueId()})
			@collection.add(item)


	initialize: (options) ->

	render: () ->
		@.$el.html(_.template(@template, {items: @collection}))

$ ->
	items = new itemCollection([
		{name: 'Wordsworth', id: _.uniqueId() },
		{name: 'Shelley', id: _.uniqueId()},
	])
	listView = new listView({collection: items, el: $('[data-view="list"]')}).render()
	addView = new addView({collection: items, el: $('[data-view="add"]')}).render()
	debugView = new debugView({collection: items, el: $('[data-view="debug"]')}).render()



