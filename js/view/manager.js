// modules

let layoutView = require('./layout');
let PlantModel = require('../model/plant');
let tmpl = require('../templates');
let PlantCollection = require('../model/plant.collection');
let UserCollection = require('../model/user.collection');

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
        userPlant = event.target.nextSibling;
        $(userPlant).slideToggle('slow', function(){
        });

    },

    addToUserList() {
        //attach gardener id to plant
        let plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        let plantObj = this.plantList.get(plantId);
        if (!this.userList._byId.hasOwnProperty(plantId)) {
          this.userList.push(plantObj);

          //method 1
          Backbone.sync("create", plantObj);

          // method 2

          // $.ajax({
          //       url:'http://localhost:8080/manager',
          //       method:'POST',
          //       data: {id: 1},
          //       success:function(){
          //           console.log('wow');
          //       },
          //       failure:function(){
          //           console.log('shit');
          //       },
          //     });
        }
    },


    /*******************************
    * Fetch and Render
    ********************************/
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
            console.error('aint no plants to grab', err);
            location.href = '';
            alert("couldn't find any plants.");
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

          if (i < 20) {
              let id = `${e.attributes.id}`;
              let name = `${e.attributes.plantName}`
              let node = document.createElement('LI');
              let twinNode = document.createElement('DIV');
              twinNode.classList.add('li-drop-down');

              node.setAttribute('data-id', id);
              node.innerHTML = `${name} <span>+</span>`;
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
