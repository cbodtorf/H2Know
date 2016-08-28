// modules

var PlantModel = require('../model/plant');
var UJLModel = require('../model/ujl');
var UJLCollection = require('../model/ujl.collection')
var PlantCollection = require('../model/plant.collection');
var UserCollection = require('../model/user.collection');
var layoutView = require('./layout');
var tmpl = require('../templates');


/*******************************
* USER-PLANTS VIEW
* (plantModel)::
********************************/

module.exports = Backbone.View.extend({

    url: 'http://localhost:8080/manager/userPlantList',

    initialize() {
        this.userList = new UserCollection();
        this.ujlCollection = new UJLCollection();
        // this.ujList = new UJLModel();
    },

    model: this.ujList,

    events: {
      'click #del-plant': 'deleteFromUserList',
      'click #wat-plant': 'waterPlant',

    },

    waterPlant() {
      var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
      var plantObj = this.userList.get(plantId);
      var self = this;

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
      var self = this;

      console.log("usr collection", this.userList)
      var userList = self.userList;
      var ujList = self.ujlCollection;
      var       timer = function(endDate, callback, interval) {

                // console.log("js time", endDate);
                endDate = new Date(endDate);
                interval = interval || 1000;
                // console.log("2 ed", endDate);

                var currentDate = new Date()
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

      userList.fetch({
        url: 'http://localhost:8080/manager/userPlantList',
        success() {
          console.log('grabbing plants', userList);
          self.render(userList.models, ujList);
        },
        error(err) {
          console.error('aint no plants to grab', err);
          alert("couldn't find any plants.");
        }

      });

      ujList.fetch({
        url: 'http://localhost:8080/manager/userJoins',
        success() {
          console.log("ujl", ujList);
            ujList.models.forEach(function(e,i) {
              console.log(e.attributes.endDate);

              var jsTime = e.attributes.endDate;


              timer(jsTime, function(timeRemaining) {
                // console.log('Timer 1:', timeRemaining);
                self.renderTimer(timeRemaining, i)
              });
            })

        },
        error(err) {
          console.error('aint no ujlist', err);
          alert("couldn't find any ujl.");
        }

      });


    },


      deleteFromUserList() {

        //remove user plant join
        var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        var plantObj = this.userList.get(plantId);
        var self = this;

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

    render(data, ujl) {

        // clear and render login to #main
        this.el.innerHTML = '';
        var mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        var ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function(e,i) {




          console.log("nwd // ed", e.attributes.nextWateringDate, e.attributes.endDate);

          if (i < 20) {
              var id = `${e.attributes.id}`;
              var name = `${e.attributes.plantName}`
              var node = document.createElement('LI');
              node.classList.add('user-plants');
              var twinNode = document.createElement('DIV');
              twinNode.classList.add('li-drop-down');

              node.setAttribute('data-id', id);
              node.innerHTML = `${name} <span>see details</span>`;
              twinNode.innerHTML = `
                <div class="li-detail-wrap">
                  <span>${e.attributes.species}</span>
                  <span>every: ${e.attributes.wateringInterval} days</span>
                  <img src="./assets/plant${id}.jpg" alt="${name}" />
                  <span class='timer'>please water your plant to start the timer</span>
                  <button id='wat-plant' type="button" name="water">Water Me</button>
                  <button id='del-plant' type="button" name="delete">delete</button>

                </div>
              `;

              ul.appendChild(node);
              ul.appendChild(twinNode);
          } else {return;}
      })
    },

    renderTimer(tttimer, i) {

      var timer = Array.from(document.querySelectorAll('.timer'));
      timer = timer[i];

      timer.innerHTML = `next watering in: <br> ${tttimer.days}days  ${tttimer.hours}hrs ${tttimer.minutes}mins ${tttimer.seconds}secs`

    }
 })
