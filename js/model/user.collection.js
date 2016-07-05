/*******************************
* COLLECTION (user's plant list)
* (model):: user's
* (role):: fetch plant data from server
********************************/

let PlantModel = require('./plant');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager/userPlantList',
    model   : PlantModel,

})
