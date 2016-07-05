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
