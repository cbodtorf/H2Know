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
