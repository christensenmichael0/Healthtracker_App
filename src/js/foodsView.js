var app = app || {};

// Food Item View
// --------------

// The DOM element for a food item
app.FoodView = Backbone.View.extend({
	tagName: 'tr',

	// Get the template for a single item
	template: _.template( $('#food-item-template').html() ),

	// When the .delete class is clicked, run the deleteFoodItem function
	events: {
		'click .delete': 'deleteFoodItem'
	},

	// Listen for changes in the model to trigger rerendering or removal
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(app.Foods, 'reset', this.remove);
	},

	// Re-renders the food item
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) ); //attributes

		return this;
	},

	// Deletes the food item
	deleteFoodItem: function() {
		this.model.destroy();
	}
});