var app=app||{};app.FoodView=Backbone.View.extend({tagName:"tr",template:_.template($("#food-item-template").html()),events:{"click .delete":"deleteFoodItem"},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove),this.listenTo(app.Foods,"reset",this.remove)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},deleteFoodItem:function(){this.model.destroy()}});