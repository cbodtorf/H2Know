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

  var layout = new Layout({
    el: document.getElementById('layout')
  });

  var router = new Router();

  Backbone.history.start();
});
},{"./router":5,"./view/layout":7}],2:[function(require,module,exports){
/*******************************
* COLLECTION
* (model:: plant
* (role):: fetch plant data from server
********************************/

let PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : '',
    model   : PlantModel,

})

},{"./plant":3}],3:[function(require,module,exports){
/*******************************
* MODEL
* (plant):: tracks plant info and watering times
* (view):: plant
********************************/

module.exports = Backbone.Model.extend({

    url: '',

    defaults: {
      plantName         : '',
      plantSpecies      : '',
      lastWateredOn     : 0,
      wateringFrequency : 0,
    },

})

},{}],4:[function(require,module,exports){
/*******************************
* MODEL
* (user):: to keep track of username and password
* (view):: login
********************************/

module.exports = Backbone.Model.extend({

    url: '',

    defaults: {
      username         : '',
      password      : '',
    },

    login(un,pw) {
      this.set('username', un);
      this.set('password', pw);
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
      this.login.render();
    },

    manager() {

    },

    plant() {

    }
})

},{"./model/plant":3,"./model/plant.collection":2,"./model/user":4,"./view/layout":7,"./view/login":8,"./view/manager":9,"./view/plant":10}],6:[function(require,module,exports){
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
    manager: ``,
    plant: ``,
    header: ``,
    footer: ``,
}

},{}],7:[function(require,module,exports){
// modules

let LoginView = require('./login');
let PlantView = require('./plant');
let ManagerView = require('./manager');

/*******************************
* LAYOUT
*
********************************/

module.exports = Backbone.View.extend({

    initialize() {
      

    },
    events() {

    },

    render() {

    },


})

},{"./login":8,"./manager":9,"./plant":10}],8:[function(require,module,exports){
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
      this.model.login(un.value, pw.value);
      un.value = '';
      pw.value = '';
    },

    render() {
      // clear and render login to #main
      this.el.innerHtml = '';
      let login = document.createElement('DIV');
      login.innerHTML = tmpl.login;
      this.el.appendChild(login);


    }
 })

},{"../templates":6,"./layout":7}],9:[function(require,module,exports){

},{}],10:[function(require,module,exports){
module.exports=require(9)
},{}]},{},[1])