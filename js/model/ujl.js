/*******************************
* MODEL
* (userjoinlist)::
* (view):: user-plant
********************************/

module.exports = Backbone.Model.extend({

    url: 'http://localhost:8080/manager/userJoins',


    defaults: {
      endDate         : null,
      lastWateredOn     : null,
      plantId : null,
      userId: null,
    },

    poop() {
      console.log("poop fn says hey");
    }


})
