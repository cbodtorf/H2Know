// modules

let layoutView = require('./layout');
let tmpl = require('../templates');

/*******************************
* HEADER
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
      let hdr = document.createElement('NAV');
      hdr.innerHTML = tmpl.header;
      this.el.appendChild(hdr);
    }
 })
