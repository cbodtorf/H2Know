/*******************************
* MODEL
* (user):: to keep track of username and password
* (view):: login
********************************/

module.exports = Backbone.Model.extend({

    url: 'localhost:8080',

    defaults: {
      username      : '',
      password      : '',
    },

    login(un,pw) {
      this.set('username', un);
      this.set('password', pw);

      save(null, {
          success() {
            console.log('hopefully we saving!')
          }
      });
    }
})
