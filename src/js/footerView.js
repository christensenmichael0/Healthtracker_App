var app = app || {};

// TableFooterView
// ---------------

// The view that controls the reset button and the calories/total fat total
app.TableFooterView = Backbone.View.extend({

	el: '#table-footer',

	// When the reset button is clicked, it triggers the resetList function
	events: {
		'click #reset-button': 'resetList'
	},

	// Set up references, listen to all changes in Foods
	initialize: function() {
		this.$totalCalories = $('.calorie-total');
		this.$fatTotal = $('.fat-total');

		this.listenTo(app.Foods, 'all', this.total);
	},

	// Reset the Foods collection and clear the localStorage
	resetList: function() {
	
		app.Foods.reset();
		localStorage.clear();
	},

	// Add up the calories from each item in the Foods collection, then display it in the correct box
	total: function() {
		var FoodsLength = app.Foods.length;
		var totalCalories = 0, totalFat = 0;
		for(var i=0; i<FoodsLength; i++) {
			totalCalories += app.Foods.models[i].get('calories'); 
			totalFat += app.Foods.models[i].get('total_fat');
		}
		this.$fatTotal.text(totalFat.toFixed(2) + ' (g)');
		this.$totalCalories.text(totalCalories.toFixed(2) + ' (KCal)');
	}

});