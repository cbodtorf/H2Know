// modules

var layoutView = require('./layout');
var PlantModel = require('../model/plant');
var tmpl = require('../templates');
var UJLModel = require('../model/ujl');
var PlantCollection = require('../model/plant.collection');
var UserCollection = require('../model/user.collection');

/*******************************
* MANAGER VIEW
* (plantModel):: plant list. Additions. User gardern
********************************/

module.exports = Backbone.View.extend({

    url: 'http://localhost:8080/manager',

    initialize() {
      this.plantList = new PlantCollection();
      this.userList = new UserCollection();
      this.plantM = new PlantModel();
    },

    model: this.plantM,


    /*******************************
    * Events
    ********************************/
    events: {
        'click li': 'dropDown',
        'click #add-plant': 'addToUserList'
    },

    dropDown() {
        var userPlant = event.target.nextSibling;
        $(userPlant).slideToggle('slow', function(){
        });

    },

    addToUserList() {
        //attach gardener id to plant
        var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        var plantObj = this.plantList.get(plantId);
        console.log("user list b4", this.userList);


          this.userList.push(plantObj);

          console.log("plant obj",plantObj);

          Backbone.sync("create", plantObj);
          console.log("user list aftr", this.userList);

    },


    /*******************************
    * Fetch and Render
    ********************************/
    getPlantList() {
        // fetching from database
        var self = this;
        var plantList = self.plantList;

        plantList.fetch({
          url: 'http://localhost:8080/manager',
          success() {
            console.log('grabbing plants', plantList);
            self.render(plantList.models);
          },
          error(err) {
            console.error('aint no plants to grab', err);
            location.href = '';
            alert("couldn't find any plants.");
          }

        });
    },






    render(data) {

        // clear and render login to #main
        this.el.innerHtml = '';
        var mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        var ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function(e,i) {

          if (i < 20) {
              var id = `${e.attributes.id}`;
              var name = `${e.attributes.plantName}`
              var node = document.createElement('LI');
              var twinNode = document.createElement('DIV');
              twinNode.classList.add('li-drop-down');

              node.setAttribute('data-id', id);
              node.innerHTML = `${name} <span>add +</span>`;
              twinNode.innerHTML = `
                <div class="li-detail-wrap">
                  <span>${e.attributes.species}</span>
                  <span>every: ${e.attributes.wateringInterval} days</span>
                  <img src="./assets/plant${id}.jpg" alt="${name}" />
                  <button id='add-plant' type="button" name="add">add</button>
                </div>
              `;

              ul.appendChild(node);
              ul.appendChild(twinNode);
          } else {return;}
      })
    }
 })
