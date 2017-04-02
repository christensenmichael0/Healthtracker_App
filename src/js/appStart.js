/*
Calorie and Fat Tracking Backbone Application by Michael Christensen
Utilized Nutrionix API

April 2017
*/

var app = app || {};

$(function() {

	// Kick things off by creating the views.
	new app.TableFooterView();
	new app.SearchView();

});