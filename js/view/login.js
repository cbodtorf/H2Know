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
