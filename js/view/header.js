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
      "click nav"               : "home",
    },

    home() {
      console.log('home');
      location.href = "#manager";
    },

    userPlants() {
      if (location.href === "http://localhost:8080/#user") {
        location.href = '#manager';
      } else {
        location.href = "#user"
      }
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
