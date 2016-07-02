/*******************************
* // Created by: Caleb Bodtorf
* // Date: 7-1-2016
********************************/

let Router = require('./router');



window.addEventListener('load', () => {
    console.log('hello');

    let router = new Router();

    Backbone.history.start();

});
