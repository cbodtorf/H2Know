// modules

let LoginView = require('./login');
let ManagerView = require('./manager');
let HeaderView = require('./header');
let FooterView = require('./footer');

/*******************************
* LAYOUT
*
********************************/

module.exports = Backbone.View.extend({
    el: document.getElementById('layout'),

    initialize() {

      this.header = new HeaderView({
        el: document.getElementById('header'),
      });

      this.footer = new FooterView({
        el: document.getElementById('footer'),
      });

    },
    events() {

    },

    render() {

    },


})
