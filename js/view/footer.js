// modules

var layoutView = require('./layout');
var tmpl = require('../templates');

/*******************************
* FOOTER
* ()::
********************************/

module.exports = Backbone.View.extend({

    initialize() {
    },

    events: {

    },

    home() {

    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      var ftr = document.createElement('DIV');
      ftr.innerHTML = tmpl.footer;
      this.el.appendChild(ftr);
    }
 })
