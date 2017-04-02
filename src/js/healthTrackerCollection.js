var app = app || {};

// FoodList Model and Collection
// ---------------

// The Food model
app.Food = Backbone.Model.extend({
	defaults: {
		name: '',
		calories: 0,
		total_fat: 0,
		saturated_fat: 0
	},

});

// The collection of foods is backed by localStorage
var FoodList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: app.Food,

	// Save all of the results items in the healthtracker-backbone namespace
	localStorage: new Backbone.LocalStorage('healthtracker-backbone'),

	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Foods are sorted by their original insertion order.
	comparator: function( food ) {
		return food.get('order');
	}
});

// Create our global collection of Foods.
app.Foods = new FoodList();