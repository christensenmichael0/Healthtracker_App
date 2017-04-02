!function(a,b){"object"==typeof exports&&"function"==typeof require?module.exports=b(require("backbone")):"function"==typeof define&&define.amd?define(["backbone"],function(c){return b(c||a.Backbone)}):b(Backbone)}(this,function(a){function b(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function c(){return b()+b()+"-"+b()+"-"+b()+"-"+b()+"-"+b()+b()+b()}function d(a){return a===Object(a)}function e(a,b){for(var c=a.length;c--;)if(a[c]===b)return!0;return!1}function f(a,b){for(var c in b)a[c]=b[c];return a}function g(a,b){if(null!=a){var c=a[b];return"function"==typeof c?a[b]():c}}return a.LocalStorage=window.Store=function(a,b){if(!this.localStorage)throw"Backbone.localStorage: Environment does not support localStorage.";this.name=a,this.serializer=b||{serialize:function(a){return d(a)?JSON.stringify(a):a},deserialize:function(a){return a&&JSON.parse(a)}};var c=this.localStorage().getItem(this.name);this.records=c&&c.split(",")||[]},f(a.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||0===a.id||(a.id=c(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this._itemName(a.id),this.serializer.serialize(a)),this.records.push(a.id.toString()),this.save(),this.find(a)},update:function(a){this.localStorage().setItem(this._itemName(a.id),this.serializer.serialize(a));var b=a.id.toString();return e(this.records,b)||(this.records.push(b),this.save()),this.find(a)},find:function(a){return this.serializer.deserialize(this.localStorage().getItem(this._itemName(a.id)))},findAll:function(){for(var a,b,c=[],d=0;d<this.records.length;d++)a=this.records[d],null!=(b=this.serializer.deserialize(this.localStorage().getItem(this._itemName(a))))&&c.push(b);return c},destroy:function(a){this.localStorage().removeItem(this._itemName(a.id));for(var b=a.id.toString(),c=0;c<this.records.length;c++)this.records[c]===b&&this.records.splice(c,1);return this.save(),a},localStorage:function(){return localStorage},_clear:function(){var a=this.localStorage(),b=new RegExp("^"+this.name+"-");a.removeItem(this.name);for(var c in a)b.test(c)&&a.removeItem(c);this.records.length=0},_storageSize:function(){return this.localStorage().length},_itemName:function(a){return this.name+"-"+a}}),a.LocalStorage.sync=window.Store.sync=a.localSync=function(b,c,d){var e,f,h=g(c,"localStorage")||g(c.collection,"localStorage"),i=a.$?a.$.Deferred&&a.$.Deferred():a.Deferred&&a.Deferred();try{switch(b){case"read":e=void 0!=c.id?h.find(c):h.findAll();break;case"create":e=h.create(c);break;case"update":e=h.update(c);break;case"delete":e=h.destroy(c)}}catch(a){f=22===a.code&&0===h._storageSize()?"Private browsing is unsupported":a.message}return e?(d&&d.success&&("0.9.10"===a.VERSION?d.success(c,e,d):d.success(e)),i&&i.resolve(e)):(f=f||"Record Not Found",d&&d.error&&("0.9.10"===a.VERSION?d.error(c,f,d):d.error(f)),i&&i.reject(f)),d&&d.complete&&d.complete(e),i&&i.promise()},a.ajaxSync=a.sync,a.getSyncMethod=function(b,c){return c&&c.ajaxSync||!g(b,"localStorage")&&!g(b.collection,"localStorage")?a.ajaxSync:a.localSync},a.sync=function(b,c,d){return a.getSyncMethod(c,d).apply(this,[b,c,d])},a.LocalStorage});