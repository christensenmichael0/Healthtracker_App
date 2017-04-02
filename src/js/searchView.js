var app = app || {};

// SearchView
// ---------------

// The view that controls the Search function at the top
app.SearchView = Backbone.View.extend({

	el: 'form',

	// When the search button is clicked, it triggers the searchForMatch function
	events: {
		'click #search-button': 'search'
	},

	// Set up references, listen to changes in Foods and Results Collections
	initialize: function() {
		that = this;

		this.$input = this.$('#search');
		this.$searchResults = this.$('.search-results');

		this.listenTo(app.Foods, 'add', this.addOne);
		this.listenTo(app.Foods, 'reset', this.addAll);

		this.listenTo(app.Results, 'add', this.addOneResult);
		this.listenTo(app.Results, 'reset', this.addAllResult);

		app.Foods.fetch();
	},

	// Add a single Food item to the list
	addOne: function( food ) {
		var view = new app.FoodView({ model: food });
		$('#food-list').append( view.render().el );
	},

	// Add all items in the Foods collection at once.. blank out the list first
	addAll: function() {
		this.$('#food-list').html('');
		app.Foods.each(this.addOne, this);
	},

	// Add a Result item to the list
	addOneResult: function( foodResult ) {
		var view = new app.ResultsView({ model: foodResult });
		$('.search-results').append( view.render().el );
	},

	// Add all items in the Results collection at once.
	addAllResult: function() {
		this.$('.search-results').html('');
		app.Results.each(this.addOne, this);
	},

	// Call the Nutritionix API, search for an item, and display results
	search: function() {
		// Prevent the form from trying to submit and redirect to a different page
		event.preventDefault();

		// Get the user query and set it up for the API
		var foodQuery = this.$input.val().trim();
		var query = 'https://api.nutritionix.com/v1_1/search/' + foodQuery + 
		'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_saturated_fat&appId=c2194c02&appKey=1ee171e5e11a6ba6f3d7ff9002fc9480';

		// Reset the Results collection
		app.Results.reset();

		if(!foodQuery) {
			this.$searchResults.text('Please enter something..');
			return false;
		}

		// Put up a loading message
		this.$searchResults.text('Loading...');

		$.ajax({url: query,
			dataType:'json',
			success: function(data) {
				that.$searchResults.text('');

				var results = data.hits;
				var resultsLength = results.length;

				// If there are no results, display an appropriate message and leave the function
				if(resultsLength === 0) {
					that.$searchResults.text('No results');
					return false;
				}
				
				// Loop through the results and create a Results item for each
				for(var i=0; i<resultsLength; i++) {
					app.Results.create({brandname: results[i].fields.brand_name,
						name: results[i].fields.item_name,
						calories: results[i].fields.nf_calories,
						total_fat: results[i].fields.nf_total_fat});
				}
			}
		}).error(function(){
			// error message
			that.$searchResults.text('Something went wrong..');
		});

		// Reset the input box
		this.$input.val('');
	}

});