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
      "click .user-plants--span": "userPlants",
    },

    home() {

    },

    userPlants() {
      console.log("hellow");
    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      let plantListHeader = document.createElement('SPAN');
      plantListHeader.classList.add('user-plants--span');
      plantListHeader.textContent = "- Your Plants -";

      let hdr = document.createElement('NAV');
      let userPlants = document.createElement('DIV');
      userPlants.classList.add('user-plants--header');
      this.el.appendChild(userPlants);
      hdr.innerHTML = tmpl.header;
      userPlants.appendChild(hdr);
      this.el.appendChild(plantListHeader);
    }
 })
