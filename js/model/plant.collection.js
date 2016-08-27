/*******************************
* COLLECTION
* (model:: plant
* (role):: fetch plant data from server
********************************/

var PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager',
    model   : PlantModel,

})
