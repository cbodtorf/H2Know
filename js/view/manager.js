// modules

let layoutView = require('./layout');
let tmpl = require('../templates');

/*******************************
* MANAGER
* (plantModel):: plant list. Additions. User gardern
********************************/

module.exports = Backbone.View.extend({

    initialize() {
    },

    events: {
        // 'click #login': 'login',
    },

    login() {

    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      let mgr = document.createElement('DIV');
      mgr.innerHTML = tmpl.manager;
      this.el.appendChild(mgr);
    }
 })
