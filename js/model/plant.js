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
