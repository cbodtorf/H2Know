// modules

let layoutView = require('./layout');
let tmpl = require('../templates');
let PlantCollection = require('../model/plant.collection');

/*******************************
* MANAGER
* (plantModel):: plant list. Additions. User gardern
********************************/

module.exports = Backbone.View.extend({

    url: 'http://localhost:8080/manager',

    initialize() {
      this.plantList = new PlantCollection();
    },

    events: {
        'click li': 'addToUserList',
    },

    addToUserList() {
        userPlant = event.target;

    },

    getPlantList() {
        // fetching from database
        let self = this;
        let plantList = self.plantList;

        plantList.fetch({
          url: 'http://localhost:8080/manager',
          success() {
            console.log('grabbing plants', plantList);
            self.render(plantList.models);
          },
          error(err) {
            console.error('aint no plants to grab', err)
          }

        });
    },


    render(data) {
        // clear and render login to #main
        this.el.innerHtml = '';
        let mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        let ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function(e,i) {

          if (i < 10) {
              let node = document.createElement('LI');
              node.setAttribute('data-id', i + 1);
              node.innerHTML = `
              ${e.attributes.plantName} <span>+</span>
              `;

              ul.appendChild(node);
          } else {return;}
      })
    }
 })
