var db = require('../config');


require('./annotations');


var User = db.Model.extend({
  // User properties:
  tableName: 'users',

  annotation: function() {
    return this.hasMany('Annotation');
  }
},{
  //Model methods
  fetchById: function(options) {
    return new this(options).fetch();
  },

  fetchByGoogleId: function(google_id) {
    return new this({
      instagram_id: google_id
    }).fetch({withRelated:['annotations']});
  },

  fetchByUsername: function(username) {
    return new this({
      username: username 
    }).fetch({withRelated:['annotations']});
  },
  newUser: function(options) {
    return new this(options);
  }
});

module.exports = db.model('User', User);
