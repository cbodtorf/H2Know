/*******************************
* // Front-end by: Caleb Bodtorf
* // Back-end by: Jon Black
* // Date: 7-1-2016
********************************/
let Layout = require('./view/layout');
let Router = require('./router');



window.addEventListener('load', () => {


    let layout = new Layout({
      el: document.getElementById('layout'),
    });

    let router = new Router();

    Backbone.history.start();

});
