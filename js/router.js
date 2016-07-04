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
