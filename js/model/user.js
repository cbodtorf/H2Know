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
