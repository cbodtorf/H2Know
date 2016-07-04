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
},{"./router":5,"./view/layout":9}],2:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
// modules

let PlantModel = require('./model/plant');
let LayoutView = require('./view/layout');
let LoginView = require('./view/login');
let PlantView = require('./view/plant');
let ManagerView = require('./view/manager');
let PlantCollection = require('./model/plant.collection');
let UserModel = require('./model/user');

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

      this.layout = new LayoutView();


  },


  routes: {
    ''        : 'login',
    'manager' : 'manager',
    'plant'   : 'plant',
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
      this.login.el.innerHTML = '';
      this.layout.header.render();
      this.layout.footer.render();

      // grabb from data base -> render()
      this.manager.getPlantList();

    },

    plant() {

    }
})

},{"./model/plant":3,"./model/plant.collection":2,"./model/user":4,"./view/layout":9,"./view/login":10,"./view/manager":11,"./view/plant":12}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"../templates":6,"./layout":9}],8:[function(require,module,exports){
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

    },

    home() {

    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      let hdr = document.createElement('NAV');
      hdr.innerHTML = tmpl.header;
      this.el.appendChild(hdr);
    }
 })

},{"../templates":6,"./layout":9}],9:[function(require,module,exports){
// modules

let LoginView = require('./login');
let PlantView = require('./plant');
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

},{"./footer":7,"./header":8,"./login":10,"./manager":11,"./plant":12}],10:[function(require,module,exports){
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

},{"../templates":6,"./layout":9}],11:[function(require,module,exports){
// modules

let layoutView = require('./layout');
let PlantModel = require('../model/plant');
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

},{"../model/plant":3,"../model/plant.collection":2,"../templates":6,"./layout":9}],12:[function(require,module,exports){

},{}]},{},[1])