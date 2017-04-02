var app = app || {};

// Results Model and Collection
// ---------------

// The Result model
app.Result = Backbone.Model.extend({
	defaults: {
		brandname: '',
		name: '',
		calories: 0,
		total_fat: 0,
	},

});

// The collection of search results is backed by localStorage
var ResultsList = Backbone.Collection.extend({

	// Reference to this collection's model
	model: app.Result,

	// Save all of the results items in the healthtracker-results-backbone namespace
	localStorage: new Backbone.LocalStorage('healthtracker-results-backbone'),

	// find the number of the next item to be inserted
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// Results are sorted by their original insertion order.
	comparator: function( result ) {
		return result.get('order');
	}
});

// Create the global collection of Results.
app.Results = new ResultsList();