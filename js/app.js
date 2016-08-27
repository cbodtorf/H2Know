/*******************************
* // Front-end by: Caleb Bodtorf
* // Back-end by: Jon Black
* // Date: 7-1-2016
********************************/
var Layout = require('./view/layout');
var Router = require('./router');



window.addEventListener('load', () => {

    var router = new Router();

    Backbone.history.start();

});
