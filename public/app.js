(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*******************************
* // Front-end by: Caleb Bodtorf
* // Back-end by: Jon Black
* // Date: 7-1-2016
********************************/
var Layout = require('./view/layout');
var Router = require('./router');

window.addEventListener('load', function () {

    var router = new Router();

    Backbone.history.start();
});
},{"./router":7,"./view/layout":11}],2:[function(require,module,exports){
/*******************************
* COLLECTION
* (model:: plant
* (role):: fetch plant data from server
********************************/

var PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager',
    model   : PlantModel,

})

},{"./plant":3}],3:[function(require,module,exports){
/*******************************
* MODEL
* (plant):: tracks plant info and watering times
* (view):: plant
********************************/

module.exports = Backbone.Model.extend({

    url: 'http://localhost:8080/manager',

    defaults: {
      plantName         : '',
      species      : '',
      lastWateredOn     : {},
      wateringInterval : 0,
      nextWateringDate: {},
    },


})

},{}],4:[function(require,module,exports){
/*******************************
* MODEL
* (userjoinlist)::
* (view):: user-plant
********************************/

module.exports = Backbone.Model.extend({

    url: 'http://localhost:8080/manager/userJoins',


    defaults: {
      endDate         : null,
      lastWateredOn     : null,
      plantId : null,
      userId: null,
    },

    poop() {
      console.log("poop fn says hey");
    }


})

},{}],5:[function(require,module,exports){
/*******************************
* COLLECTION (user's plant list)
* (model):: user's
* (role):: fetch plant data from server
********************************/

var PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager/userPlantList',
    model   : PlantModel,

})

},{"./plant":3}],6:[function(require,module,exports){
/*******************************
* MODEL
* (user):: to keep track of username and password
* (view):: login
********************************/

module.exports = Backbone.Model.extend({

    url: 'http://localhost:8080/login',

    defaults: {
      username      : '',
      password      : '',
    },

    login(un,pw) {
      this.set('username', un);
      this.set('password', pw);

      this.save(null, {
          success() {
            console.log('hopefully we saving!');
            location.href = '#manager';
          },
          error() {
            var err = document.getElementById('password');
            err.placeholder = 'wrong password';
            console.log('you suck try again, wrong password');
          }
      });
    }
})

},{}],7:[function(require,module,exports){
// modules

var PlantModel = require('./model/plant');
var LayoutView = require('./view/layout');
var LoginView = require('./view/login');
var UJLModel = require('./model/ujl');
var ManagerView = require('./view/manager');
var PlantCollection = require('./model/plant.collection');
var UserModel = require('./model/user');
var UserPlantView = require('./view/user-plants')

/*******************************
* ROUTER
*
********************************/

module.exports = Backbone.Router.extend({


  initialize() {
      var userM = new UserModel();

      this.login = new LoginView({
        model: userM,
        el: document.getElementById('main'),
      });

      this.manager = new ManagerView({
        el: document.getElementById('main'),
      });

      this.userView = new UserPlantView({
        el: document.getElementById('main'),
      })

      this.layout = new LayoutView();


  },


  routes: {
    ''        : 'login',
    'manager' : 'manager',
    'user'   : 'user',
  },


  /*******************************
    * ROUTE events show/hide VIEWS
    *********var***********************/

    login() {
      this.layout.header.el.innerHTML = '';
      this.layout.footer.el.innerHTML = '';
      this.manager.el.innerHTML = '';
      this.login.render();
    },

    manager() {
      this.layout.header.el.innerHTML = '';
      this.layout.footer.el.innerHTML = '';
      this.login.el.innerHTML = '';
      this.layout.header.render();
      this.layout.footer.render();

      // grabb from data base -> render()
      this.manager.getPlantList();

    },

    user() {
      this.layout.header.el.innerHTML = '';
      this.layout.footer.el.innerHTML = '';
      this.manager.el.innerHTML = '';

      this.layout.header.render();
      this.layout.footer.render();
      $('.user-plants--span').html('- My Plants -');

      this.userView.getUserPlantList();

    }
})

},{"./model/plant":3,"./model/plant.collection":2,"./model/ujl":4,"./model/user":6,"./view/layout":11,"./view/login":12,"./view/manager":13,"./view/user-plants":14}],8:[function(require,module,exports){
/*******************************
* TEMPLATES
*
********************************/

module.exports = {
    login:`
        <div class="login">
            <input id="username" type="text" placeholder="username" value="">
            <input id="password" type="password" placeholder="password" value="">
            <button id="login" type="button">Login</button>
        </div>
    `,

    manager: `
        <div class="manager">
            <ul id="plant-list">
            </ul>
        </div>
    `,

    plantAdd: ``,

    header: `
        <h1>H<sub>2</sub></h1><span>&#27700;n<h1>O</h1>w</span>
    `,

    footer: `
      <h5>"dont be a plant murderer"</h5>
      <span>&copy;2016 Black & Bodtorf</span>
    `,
}

},{}],9:[function(require,module,exports){
// modules

var layoutView = require('./layout');
var tmpl = require('../templates');

/*******************************
* FOOTER
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
      var ftr = document.createElement('DIV');
      ftr.innerHTML = tmpl.footer;
      this.el.appendChild(ftr);
    }
 })

},{"../templates":8,"./layout":11}],10:[function(require,module,exports){
// modules

var layoutView = require('./layout');
var tmpl = require('../templates');

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
      var plantListHeader = document.createElement('SPAN');
      plantListHeader.classList.add('user-plants--span');
      plantListHeader.textContent = "- Add Plants -";

      var hdr = document.createElement('NAV');
      var userPlants = document.createElement('DIV');
      userPlants.classList.add('user-plants--header');
      this.el.appendChild(userPlants);
      hdr.innerHTML = tmpl.header;
      userPlants.appendChild(hdr);
      this.el.appendChild(plantListHeader);
    }
 })

},{"../templates":8,"./layout":11}],11:[function(require,module,exports){
// modules

var LoginView = require('./login');
var ManagerView = require('./manager');
var HeaderView = require('./header');
var FooterView = require('./footer');

/*******************************
* LAYOUT
*
********************************/

module.exports = Backbone.View.extend({
    el: document.getElementById('layout'),

    initialize() {

      this.header = new HeaderView({
        el: document.getElementById('header'),
      });

      this.footer = new FooterView({
        el: document.getElementById('footer'),
      });

    },
    events() {

    },

    render() {

    },


})

},{"./footer":9,"./header":10,"./login":12,"./manager":13}],12:[function(require,module,exports){
// modules

var layoutView = require('./layout');
var tmpl = require('../templates');

/*******************************
* LOGIN
* (UserModel):: send input fields to user model
********************************/

module.exports = Backbone.View.extend({

    initialize() {
    },

    events: {
        'click #login': 'login',
    },

    login() {
      var un = document.getElementById('username');
      var pw = document.getElementById('password');
      if (un.value === '' || pw.value === '') {
          un.placeholder = 'something\'s not right';
      } else {
        this.model.login(un.value, pw.value);
        pw.placeholder = 'password';
        un.value = '';
        pw.value = '';
      }
    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      var login = document.createElement('DIV');
      login.innerHTML = tmpl.login;
      this.el.appendChild(login);


    }
 })

},{"../templates":8,"./layout":11}],13:[function(require,module,exports){
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
        userPlant = event.target.nextSibling;
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

},{"../model/plant":3,"../model/plant.collection":2,"../model/ujl":4,"../model/user.collection":5,"../templates":8,"./layout":11}],14:[function(require,module,exports){
// modules

var PlantModel = require('../model/plant');
var UJLModel = require('../model/ujl');
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
        this.ujList = new UJLModel();
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
      var ujList = self.ujList;

      ujList.fetch({
        url: 'http://localhost:8080/manager/userJoins',
        success() {
          console.log("ujl", ujList);
          var jsTime = ujList.attributes[0].endDate;


          timer(jsTime, function(timeRemaining) {
            // console.log('Timer 1:', timeRemaining);
            self.renderTimer(timeRemaining)
          });

        },
        error(err) {
          console.error('aint no ujlist', err);
          alert("couldn't find any ujl.");
        }

      });

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

      timer = function(endDate, callback, interval) {

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

    renderTimer(tttimer) {
      var timer = Array.from(document.querySelectorAll('.timer'));

      timer.forEach(function(e,i){
        e.innerHTML = `next watering in: <br> ${tttimer.days}days  ${tttimer.hours}hrs ${tttimer.minutes}mins ${tttimer.seconds}secs`
      })

    }
 })

},{"../model/plant":3,"../model/plant.collection":2,"../model/ujl":4,"../model/user.collection":5,"../templates":8,"./layout":11}]},{},[1])