// modules

let PlantModel = require('../model/plant');
let PlantCollection = require('../model/plant.collection');
let UserCollection = require('../model/user.collection');
let layoutView = require('./layout');
let tmpl = require('../templates');

/*******************************
* USER-PLANTS VIEW
* (plantModel)::
********************************/

module.exports = Backbone.View.extend({

    url: 'http://localhost:8080/manager/userPlantList',

    initialize() {
        this.userList = new UserCollection();
    },

    events: {
      'click #del-plant': 'deleteFromUserList',
      'click #wat-plant': 'waterPlant',

    },

    waterPlant() {
      let plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
      let plantObj = this.userList.get(plantId);
      let self = this;

      $.ajax({
            url:`http://localhost:8080/water${plantId}`,
            method:'PUT',
            success:function(){
              console.log('watering plant');
              self.getUserPlantList();
            },
            error(err) {
                console.error("sumthin's wrong: this is what I tried to sent", err);
                alert("i wrote this alert to be annoying because the watering doesn't work.")
              }
          });

    },

    getUserPlantList() {
      // fetching user plant list from database
      let self = this;

      console.log("usr collection", this.userList)
      let userList = self.userList;

      userList.fetch({
        url: 'http://localhost:8080/manager/userPlantList',
        success() {
          console.log('grabbing plants', userList);
          self.render(userList.models);
        },
        error(err) {
          console.error('aint no plants to grab', err);
          alert("couldn't find any plants.");
        }

      });
    },
    getUserJoinList() {
      // fetching user join list from database
      userList.fetch({
        url: 'http://localhost:8080/manager/userJoins',
        success(data) {
          console.log('grabbing user joins no render', data);
          // self.render(userList.models);
        },
        error(err) {
          console.error('aint no ujl to grab', err);
          alert("couldn't find any ujl.");
        }

      });
    },

      deleteFromUserList() {

        //remove user plant join
        let plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        let plantObj = this.userList.get(plantId);
        let self = this;

        $.ajax({
              url:`http://localhost:8080/manager/userPlantList/${plantId}`,
              method:'DELETE',
              success:function(){
                console.log('deleting plant');
                self.getUserPlantList();
              },
              error(err) {
                  console.error("sumthin's wrong: this is what I tried to sent", err);
                  alert("i wrote this alert to be annoying because the delete doesn't work.")
                }
            });

    },

    render(data) {
        // clear and render login to #main
        this.el.innerHTML = '';
        let mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        let ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function(e,i) {

          timer = function(endDate, callback, interval) {

              console.log("js time", endDate);
              endDate = new Date(endDate);
              interval = interval || 1000;
              console.log("2 ed", endDate);

              let currentDate = new Date()
                  , millisecondDiff = endDate.getTime() - currentDate.getTime() // get difference in milliseconds
                  , timeRemaining = {
                      days: 0
                      , hours: 0
                      , minutes: 0
                      , seconds: 0
                  }
                  ;

              if(millisecondDiff > 0) {
                  millisecondDiff = Math.floor( millisecondDiff/1000 ); // kill the "milliseconds" so just secs

          		timeRemaining.days = Math.floor( millisecondDiff/86400 ); // days
          		millisecondDiff = millisecondDiff % 86400;

          		timeRemaining.hours = Math.floor( millisecondDiff/3600 ); // hours
          		millisecondDiff = millisecondDiff % 3600;

          		timeRemaining.minutes = Math.floor( millisecondDiff/60 ); // minutes
          		millisecondDiff = millisecondDiff % 60;

          		timeRemaining.seconds = Math.floor(millisecondDiff); // seconds

                  setTimeout(function() {
                      timer(endDate, callback);
                  }, interval);
              }

              callback(timeRemaining);
          }

          let jsTime = e.attributes.nextWateringDate;
          // jsTime.pop();
          // jsTime = jsTime.map(function(e, i){
          //   if (i === 1) {
          //     e = e - 1;
          //   }
          //   return e
          // })

          timer(jsTime, function(timeRemaining) {
          	console.log('Timer 1:', timeRemaining);
          });


          console.log("nwd // ed", e.attributes.nextWateringDate, e.attributes.endDate);

          if (i < 20) {
              let id = `${e.attributes.id}`;
              let name = `${e.attributes.plantName}`
              let node = document.createElement('LI');
              node.classList.add('user-plants');
              let twinNode = document.createElement('DIV');
              twinNode.classList.add('li-drop-down');

              node.setAttribute('data-id', id);
              node.innerHTML = `${name} <span>see details</span>`;
              twinNode.innerHTML = `
                <div class="li-detail-wrap">
                  <span>${e.attributes.species}</span>
                  <span>every: ${e.attributes.wateringInterval} days</span>
                  <img src="./assets/plant${id}.jpg" alt="${name}" />
                  <span>${e.attributes.nextWateringDate}</span>
                  <button id='wat-plant' type="button" name="water">Water Me</button>
                  <button id='del-plant' type="button" name="delete">delete</button>

                </div>
              `;

              ul.appendChild(node);
              ul.appendChild(twinNode);
          } else {return;}
      })
    }
 })
