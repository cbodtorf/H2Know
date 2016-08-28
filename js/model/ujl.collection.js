/*******************************
* COLLECTION (ujl)
* (model):: ujl
********************************/

var UJLModel = require('./ujl');


module.exports = Backbone.Collection.extend({

    url     : 'http://localhost:8080/manager/userJoins',
    model   : UJLModel,

})
