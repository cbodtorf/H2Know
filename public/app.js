"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
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
  }, { "./router": 8, "./view/layout": 12 }], 2: [function (require, module, exports) {
    /*******************************
    * COLLECTION
    * (model:: plant
    * (role):: fetch plant data from server
    ********************************/

    var PlantModel = require('./plant');

    module.exports = Backbone.Collection.extend({

      url: 'http://localhost:8080/manager',
      model: PlantModel

    });
  }, { "./plant": 3 }], 3: [function (require, module, exports) {
    /*******************************
    * MODEL
    * (plant):: tracks plant info and watering times
    * (view):: plant
    ********************************/

    module.exports = Backbone.Model.extend({

      url: 'http://localhost:8080/manager',

      defaults: {
        plantName: '',
        species: '',
        lastWateredOn: {},
        wateringInterval: 0,
        nextWateringDate: {}
      }

    });
  }, {}], 4: [function (require, module, exports) {
    /*******************************
    * COLLECTION (ujl)
    * (model):: ujl
    ********************************/

    var UJLModel = require('./ujl');

    module.exports = Backbone.Collection.extend({

      url: 'http://localhost:8080/manager/userJoins',
      model: UJLModel

    });
  }, { "./ujl": 5 }], 5: [function (require, module, exports) {
    /*******************************
    * MODEL
    * (userjoinlist)::
    * (view):: user-plant
    ********************************/

    module.exports = Backbone.Model.extend({

      url: 'http://localhost:8080/manager/userJoins',

      defaults: {
        endDate: null,
        lastWateredOn: null,
        plantId: null,
        userId: null
      },

      poop: function poop() {
        console.log("poop fn says hey");
      }
    });
  }, {}], 6: [function (require, module, exports) {
    /*******************************
    * COLLECTION (user's plant list)
    * (model):: user's
    * (role):: fetch plant data from server
    ********************************/

    var PlantModel = require('./plant');

    module.exports = Backbone.Collection.extend({

      url: 'http://localhost:8080/manager/userPlantList',
      model: PlantModel

    });
  }, { "./plant": 3 }], 7: [function (require, module, exports) {
    /*******************************
    * MODEL
    * (user):: to keep track of username and password
    * (view):: login
    ********************************/

    module.exports = Backbone.Model.extend({

      url: 'http://localhost:8080/login',

      defaults: {
        username: '',
        password: ''
      },

      login: function login(un, pw) {
        this.set('username', un);
        this.set('password', pw);

        this.save(null, {
          success: function success() {
            console.log('hopefully we saving!');
            location.href = '#manager';
          },
          error: function error() {
            var err = document.getElementById('password');
            err.placeholder = 'wrong password';
            console.log('you suck try again, wrong password');
          }
        });
      }
    });
  }, {}], 8: [function (require, module, exports) {
    // modules

    var PlantModel = require('./model/plant');
    var LayoutView = require('./view/layout');
    var LoginView = require('./view/login');
    var UJLModel = require('./model/ujl');
    var ManagerView = require('./view/manager');
    var PlantCollection = require('./model/plant.collection');
    var UserModel = require('./model/user');
    var UserPlantView = require('./view/user-plants');

    /*******************************
    * ROUTER
    *
    ********************************/

    module.exports = Backbone.Router.extend({
      initialize: function initialize() {
        var userM = new UserModel();

        this.login = new LoginView({
          model: userM,
          el: document.getElementById('main')
        });

        this.manager = new ManagerView({
          el: document.getElementById('main')
        });

        this.userView = new UserPlantView({
          el: document.getElementById('main')
        });

        this.layout = new LayoutView();
      },


      routes: {
        '': 'login',
        'manager': 'manager',
        'user': 'user'
      },

      /*******************************
        * ROUTE events show/hide VIEWS
        *********var***********************/

      login: function login() {
        this.layout.header.el.innerHTML = '';
        this.layout.footer.el.innerHTML = '';
        this.manager.el.innerHTML = '';
        this.login.render();
      },
      manager: function manager() {
        this.layout.header.el.innerHTML = '';
        this.layout.footer.el.innerHTML = '';
        this.login.el.innerHTML = '';
        this.layout.header.render();
        this.layout.footer.render();

        // grabb from data base -> render()
        this.manager.getPlantList();
      },
      user: function user() {
        this.layout.header.el.innerHTML = '';
        this.layout.footer.el.innerHTML = '';
        this.manager.el.innerHTML = '';

        this.layout.header.render();
        this.layout.footer.render();
        $('.user-plants--span').html('- My Plants -');

        this.userView.getUserPlantList();
      }
    });
  }, { "./model/plant": 3, "./model/plant.collection": 2, "./model/ujl": 5, "./model/user": 7, "./view/layout": 12, "./view/login": 13, "./view/manager": 14, "./view/user-plants": 15 }], 9: [function (require, module, exports) {
    /*******************************
    * TEMPLATES
    *
    ********************************/

    module.exports = {
      login: "\n        <div class=\"login\">\n            <input id=\"username\" type=\"text\" placeholder=\"username\" value=\"\">\n            <input id=\"password\" type=\"password\" placeholder=\"password\" value=\"\">\n            <button id=\"login\" type=\"button\">Login</button>\n        </div>\n    ",

      manager: "\n        <div class=\"manager\">\n            <ul id=\"plant-list\">\n            </ul>\n        </div>\n    ",

      plantAdd: "",

      header: "\n        <h1>H<sub>2</sub></h1><span>&#27700;n<h1>O</h1>w</span>\n    ",

      footer: "\n      <h5>\"dont be a plant murderer\"</h5>\n      <span>&copy;2016 Black & Bodtorf</span>\n    "
    };
  }, {}], 10: [function (require, module, exports) {
    // modules

    var layoutView = require('./layout');
    var tmpl = require('../templates');

    /*******************************
    * FOOTER
    * ()::
    ********************************/

    module.exports = Backbone.View.extend({
      initialize: function initialize() {},


      events: {},

      home: function home() {},
      render: function render() {
        // clear and render login to #main
        this.el.innerHtml = '';
        var ftr = document.createElement('DIV');
        ftr.innerHTML = tmpl.footer;
        this.el.appendChild(ftr);
      }
    });
  }, { "../templates": 9, "./layout": 12 }], 11: [function (require, module, exports) {
    // modules

    var layoutView = require('./layout');
    var tmpl = require('../templates');

    /*******************************
    * HEADER
    * ()::
    ********************************/

    module.exports = Backbone.View.extend({
      initialize: function initialize() {},


      events: {
        "click .user-plants--span": "userPlants",
        "click nav": "home"
      },

      home: function home() {
        console.log('home');
        location.href = "#manager";
      },
      userPlants: function userPlants() {
        if (location.href === "http://localhost:8080/#user") {
          location.href = '#manager';
        } else {
          location.href = "#user";
        }
      },
      render: function render() {
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
    });
  }, { "../templates": 9, "./layout": 12 }], 12: [function (require, module, exports) {
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

      initialize: function initialize() {

        this.header = new HeaderView({
          el: document.getElementById('header')
        });

        this.footer = new FooterView({
          el: document.getElementById('footer')
        });
      },
      events: function events() {},
      render: function render() {}
    });
  }, { "./footer": 10, "./header": 11, "./login": 13, "./manager": 14 }], 13: [function (require, module, exports) {
    // modules

    var layoutView = require('./layout');
    var tmpl = require('../templates');

    /*******************************
    * LOGIN
    * (UserModel):: send input fields to user model
    ********************************/

    module.exports = Backbone.View.extend({
      initialize: function initialize() {},


      events: {
        'click #login': 'login'
      },

      login: function login() {
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
      render: function render() {
        // clear and render login to #main
        this.el.innerHtml = '';
        var login = document.createElement('DIV');
        login.innerHTML = tmpl.login;
        this.el.appendChild(login);
      }
    });
  }, { "../templates": 9, "./layout": 12 }], 14: [function (require, module, exports) {
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

      initialize: function initialize() {
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

      dropDown: function dropDown() {
        var userPlant = event.target.nextSibling;
        $(userPlant).slideToggle('slow', function () {});
      },
      addToUserList: function addToUserList() {
        //attach gardener id to plant
        var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        var plantObj = this.plantList.get(plantId);
        console.log("user list b4", this.userList);

        this.userList.push(plantObj);

        console.log("plant obj", plantObj);

        Backbone.sync("create", plantObj);
        console.log("user list aftr", this.userList);
      },


      /*******************************
      * Fetch and Render
      ********************************/
      getPlantList: function getPlantList() {
        // fetching from database
        var self = this;
        var plantList = self.plantList;

        plantList.fetch({
          url: 'http://localhost:8080/manager',
          success: function success() {
            console.log('grabbing plants', plantList);
            self.render(plantList.models);
          },
          error: function error(err) {
            console.error('aint no plants to grab', err);
            location.href = '';
            alert("couldn't find any plants.");
          }
        });
      },
      render: function render(data) {

        // clear and render login to #main
        this.el.innerHtml = '';
        var mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        var ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function (e, i) {

          if (i < 20) {
            var id = "" + e.attributes.id;
            var name = "" + e.attributes.plantName;
            var node = document.createElement('LI');
            var twinNode = document.createElement('DIV');
            twinNode.classList.add('li-drop-down');

            node.setAttribute('data-id', id);
            node.innerHTML = name + " <span>add +</span>";
            twinNode.innerHTML = "\n                <div class=\"li-detail-wrap\">\n                  <span>" + e.attributes.species + "</span>\n                  <span>every: " + e.attributes.wateringInterval + " days</span>\n                  <img src=\"./assets/plant" + id + ".jpg\" alt=\"" + name + "\" />\n                  <button id='add-plant' type=\"button\" name=\"add\">add</button>\n                </div>\n              ";

            ul.appendChild(node);
            ul.appendChild(twinNode);
          } else {
            return;
          }
        });
      }
    });
  }, { "../model/plant": 3, "../model/plant.collection": 2, "../model/ujl": 5, "../model/user.collection": 6, "../templates": 9, "./layout": 12 }], 15: [function (require, module, exports) {
    // modules

    var PlantModel = require('../model/plant');
    var UJLModel = require('../model/ujl');
    var UJLCollection = require('../model/ujl.collection');
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

      initialize: function initialize() {
        this.userList = new UserCollection();
        this.ujlCollection = new UJLCollection();
        // this.ujList = new UJLModel();
      },


      model: this.ujList,

      events: {
        'click #del-plant': 'deleteFromUserList',
        'click #wat-plant': 'waterPlant'

      },

      waterPlant: function waterPlant() {
        var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        var plantObj = this.userList.get(plantId);
        var self = this;

        $.ajax({
          url: "http://localhost:8080/water" + plantId,
          method: 'PUT',
          success: function success() {
            console.log('watering plant');
            self.getUserPlantList();
          },
          error: function error(err) {
            console.error("sumthin's wrong: this is what I tried to sent", err);
            alert("i wrote this alert to be annoying because the watering doesn't work.");
          }
        });
      },
      getUserPlantList: function getUserPlantList() {
        // fetching user plant list from database
        var self = this;

        console.log("usr collection", this.userList);
        var userList = self.userList;
        var ujList = self.ujlCollection;
        var timer = function timer(endDate, callback, interval) {

          // console.log("js time", endDate);
          endDate = new Date(endDate);
          interval = interval || 1000;
          // console.log("2 ed", endDate);

          var currentDate = new Date(),
              millisecondDiff = endDate.getTime() - currentDate.getTime() // get difference in milliseconds
          ,
              timeRemaining = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };

          if (millisecondDiff > 0) {
            millisecondDiff = Math.floor(millisecondDiff / 1000); // kill the "milliseconds" so just secs

            timeRemaining.days = Math.floor(millisecondDiff / 86400); // days
            millisecondDiff = millisecondDiff % 86400;

            timeRemaining.hours = Math.floor(millisecondDiff / 3600); // hours
            millisecondDiff = millisecondDiff % 3600;

            timeRemaining.minutes = Math.floor(millisecondDiff / 60); // minutes
            millisecondDiff = millisecondDiff % 60;

            timeRemaining.seconds = Math.floor(millisecondDiff); // seconds

            setTimeout(function () {
              timer(endDate, callback);
            }, interval);
          }

          callback(timeRemaining);
        };

        userList.fetch({
          url: 'http://localhost:8080/manager/userPlantList',
          success: function success() {
            console.log('grabbing plants', userList);
            self.render(userList.models, ujList);
          },
          error: function error(err) {
            console.error('aint no plants to grab', err);
            alert("couldn't find any plants.");
          }
        });

        ujList.fetch({
          url: 'http://localhost:8080/manager/userJoins',
          success: function success() {
            console.log("ujl", ujList);
            ujList.models.forEach(function (e, i) {
              console.log(e.attributes.endDate);

              var jsTime = e.attributes.endDate;

              timer(jsTime, function (timeRemaining) {
                // console.log('Timer 1:', timeRemaining);
                self.renderTimer(timeRemaining, i);
              });
            });
          },
          error: function error(err) {
            console.error('aint no ujlist', err);
            alert("couldn't find any ujl.");
          }
        });
      },
      deleteFromUserList: function deleteFromUserList() {

        //remove user plant join
        var plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        var plantObj = this.userList.get(plantId);
        var self = this;

        $.ajax({
          url: "http://localhost:8080/manager/userPlantList/" + plantId,
          method: 'DELETE',
          success: function success() {
            console.log('deleting plant');
            self.getUserPlantList();
          },
          error: function error(err) {
            console.error("sumthin's wrong: this is what I tried to sent", err);
            alert("i wrote this alert to be annoying because the delete doesn't work.");
          }
        });
      },
      render: function render(data, ujl) {

        // clear and render login to #main
        this.el.innerHTML = '';
        var mgr = document.createElement('DIV');
        mgr.innerHTML = tmpl.manager;
        this.el.appendChild(mgr);
        var ul = document.getElementById('plant-list');

        // insert each plant into add list for user to click
        data.forEach(function (e, i) {

          console.log("nwd // ed", e.attributes.nextWateringDate, e.attributes.endDate);

          if (i < 20) {
            var id = "" + e.attributes.id;
            var name = "" + e.attributes.plantName;
            var node = document.createElement('LI');
            node.classList.add('user-plants');
            var twinNode = document.createElement('DIV');
            twinNode.classList.add('li-drop-down');

            node.setAttribute('data-id', id);
            node.innerHTML = name + " <span>see details</span>";
            twinNode.innerHTML = "\n                <div class=\"li-detail-wrap\">\n                  <span>" + e.attributes.species + "</span>\n                  <span>every: " + e.attributes.wateringInterval + " days</span>\n                  <img src=\"./assets/plant" + id + ".jpg\" alt=\"" + name + "\" />\n                  <span class='timer'>please water your plant to start the timer</span>\n                  <button id='wat-plant' type=\"button\" name=\"water\">Water Me</button>\n                  <button id='del-plant' type=\"button\" name=\"delete\">delete</button>\n\n                </div>\n              ";

            ul.appendChild(node);
            ul.appendChild(twinNode);
          } else {
            return;
          }
        });
      },
      renderTimer: function renderTimer(tttimer, i) {

        var timer = Array.from(document.querySelectorAll('.timer'));
        timer = timer[i];

        timer.innerHTML = "next watering in: <br> " + tttimer.days + "days  " + tttimer.hours + "hrs " + tttimer.minutes + "mins " + tttimer.seconds + "secs";
      }
    });
  }, { "../model/plant": 3, "../model/plant.collection": 2, "../model/ujl": 5, "../model/ujl.collection": 4, "../model/user.collection": 6, "../templates": 9, "./layout": 12 }] }, {}, [1]);