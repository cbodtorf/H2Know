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
},{"./router":6,"./view/layout":10}],2:[function(require,module,exports){
/*******************************
* COLLECTION
* (model:: plant
* (role):: fetch plant data from server
********************************/

let PlantModel = require('./plant');


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
* COLLECTION (user's plant list)
* (model):: user's
* (role):: fetch plant data from server
********************************/

let PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager/userPlantList',
    model   : PlantModel,

})

},{"./plant":3}],5:[function(require,module,exports){
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
            let err = document.getElementById('password');
            err.placeholder = 'wrong password';
            console.log('you suck try again, wrong password');
          }
      });
    }
})

},{}],6:[function(require,module,exports){
// modules

let PlantModel = require('./model/plant');
let LayoutView = require('./view/layout');
let LoginView = require('./view/login');
let ManagerView = require('./view/manager');
let PlantCollection = require('./model/plant.collection');
let UserModel = require('./model/user');
let UserPlantView = require('./view/user-plants')

/*******************************
* ROUTER
*
********************************/

module.exports = Backbone.Router.extend({


  initialize() {
      let userM = new UserModel();

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
    ********************************/

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
      $('.user-plants--span').html('- Add Plants -');

      this.userView.getUserPlantList();

    }
})

},{"./model/plant":3,"./model/plant.collection":2,"./model/user":5,"./view/layout":10,"./view/login":11,"./view/manager":12,"./view/user-plants":13}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
// modules

let layoutView = require('./layout');
let tmpl = require('../templates');

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
      let ftr = document.createElement('DIV');
      ftr.innerHTML = tmpl.footer;
      this.el.appendChild(ftr);
    }
 })

},{"../templates":7,"./layout":10}],9:[function(require,module,exports){
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

},{"../templates":7,"./layout":10}],10:[function(require,module,exports){
// modules

let LoginView = require('./login');
let ManagerView = require('./manager');
let HeaderView = require('./header');
let FooterView = require('./footer');

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

},{"./footer":8,"./header":9,"./login":11,"./manager":12}],11:[function(require,module,exports){
// modules

let layoutView = require('./layout');
let tmpl = require('../templates');

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
      let un = document.getElementById('username');
      let pw = document.getElementById('password');
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
      let login = document.createElement('DIV');
      login.innerHTML = tmpl.login;
      this.el.appendChild(login);


    }
 })

},{"../templates":7,"./layout":10}],12:[function(require,module,exports){
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

          console.log("plant obj",plantObj);
          //method 1

          Backbone.sync("create", plantObj);


          // method 2

          // let trialObj = plantObj.toJSON;
          // console.log("trial", trialObj)
          // $.ajax({
          //       url:'http://localhost:8080/manager',
          //       method:'POST',
          //       data: trialObj,
          //       success:function(){
          //           console.log('wow');
          //       },
          //       failure:function(){
          //           console.log('shit');
          //       },
          //     });


          // method 3
          // plantObj.save();
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

},{"../model/plant":3,"../model/plant.collection":2,"../model/user.collection":4,"../templates":7,"./layout":10}],13:[function(require,module,exports){
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
      'click #del-plant': 'deleteFromUserList'

    },

    getUserPlantList() {
      // fetching user plant list from database
      let self = this;

      console.log(UserCollection)
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

      deleteFromUserList() {
        //remove user plant join
        let plantId = event.target.parentElement.parentElement.previousSibling.getAttribute('data-id');
        let plantObj = this.userList.get(plantId);
        plantObj.destroy();
        this.getUserPlantList();
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
                  <button id='del-plant' type="button" name="delete">delete</button>
                </div>
              `;

              ul.appendChild(node);
              ul.appendChild(twinNode);
          } else {return;}
      })
    }
 })

},{"../model/plant":3,"../model/plant.collection":2,"../model/user.collection":4,"../templates":7,"./layout":10}]},{},[1])