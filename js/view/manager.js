// modules

let layoutView = require('./layout');
let tmpl = require('../templates');

/*******************************
* MANAGER
* (plantModel):: plant list. Additions. User gardern
********************************/

module.exports = Backbone.View.extend({

    url: 'http://localhost:8080/manager',

    initialize() {
    },

    events: {
        // 'click #login': 'login',
    },

    login() {

    },

    render(data) {
      // clear and render login to #main
      this.el.innerHtml = '';
      let mgr = document.createElement('DIV');
      mgr.innerHTML = tmpl.manager;
      this.el.appendChild(mgr);
      let ul = document.getElementById('plant-list')

      data.forEach(function(e,i) {

        if (i < 10) {
          let node = document.createElement('LI');
          node.innerHTML = `
            ${e.attributes.plantName} <span>+</span>
        `;

        ul.appendChild(node);
      } else {return;}
    })
  }
 })
