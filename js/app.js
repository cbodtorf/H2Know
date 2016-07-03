/*******************************
* // Front-end by: Caleb Bodtorf
* // Back-end by: Jon Black
* // Date: 7-1-2016
********************************/
let Layout = require('./view/layout');
let Router = require('./router');



window.addEventListener('load', () => {

    let router = new Router();

    Backbone.history.start();

});
