var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var morgan = require('morgan');

var app = express();
var server = http.Server(app);
require('./db/config.js');
require('./db/models/annotations'); 
require('./db/models/users');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  next();
});


app.get('/',function(req,res){
  res.send('connected')
});

// Create annotations 
app.post('/api/annotations', function(req,res){
  var ann = req.body;
  var text = req.body.text;
  var quote = req.body.quote;
  var uri = req.body.uri;
  var start = req.body.ranges[0].start;
  var end = req.body.ranges[0].end;
  var startOffset = req.body.ranges[0].startOffset;
  var endOffset = req.body.ranges[0].endOffset;
  var user_id = req.body.user_id;

 
  db.model('Annotation').newAnnotation({
    text: text,
    quote: quote,
    uri: uri,
    user_id: user_id,
    start: start,
    end: end,
    startOffset: startOffset,
    endOffset: endOffset
  }).save().then(function(data){
    console.log('heres the annotation id ', data.id);
    ann.id = data.id;
    res.set('Content-Type','application/JSON');
    res.json(ann);
    res.end();
  });




});

// Create Users 

app.post('/api/users', function(req,res){
  console.log('here is the add user request  body ', req.body)
  var facebook_id = req.body.facebook_id;
  var full_name = req.body.full_name;
  var pic_url = req.body.pic_url;
  var email = req.body.email;
  
  var user = {
    facebook_id: facebook_id,
    full_name: full_name,
    pic_url: pic_url,
    email: email
  };

  db.model('User').fetchByFacebookId(facebook_id).then(function(data){
    
    if (data === null) {
      db.model('User').newUser(user).save().then(function(newUserData) {
      console.log('******** here is the user object ', user)
        user['user_id'] = newUserData.attributes.id;
        user.facebook_id = undefined;
        res.set('Content-Type', 'application/JSON');
        res.json(user);
        res.end();
      });
    }else{
      user['user_id'] = data.attributes.id;
      user.facebook_id = undefined;
      console.log('the data object', data.attributes.id)
      res.set('Content-Type', 'application/JSON');
      res.json(user);
      res.end();  
    }

  });
});






/// Delete functionality

app.delete('/api/annotations/:id',function(req,res){
  var annId = req.params.id;
  console.log('the params id ',annId)
  db.model('Annotation').destroyById(annId).then(function(data){
    console.log('this is the annotation to be deleted ', data);
    res.sendStatus(204)
  })
});
// Update endpoint 

app.put('/api/annotations/:id',function(req,res){
  var annId = req.params.id;
  db.model('Annotation').updateById({id:annId, text:req.body.text}).then(function(data){
    console.log('database updated ');
  })
  db.model('Annotation').fetchByUri(annId).then(function(data){ 
  var resObj = {
        id: data.attributes.id,
        text: req.body.text,
        quote: data.attributes.quote,
        ranges: [
          {
            start: data.attributes.start,
            end: data.attributes.end,
            startOffset: data.attributes.startOffset,
            endOffset: data.attributes.endOffset
          }
        ]
       };

    res.set('Content-Type','application/JSON');   
    res.json(resObj);
    res.end();
  });


});


// Search endpoint(Read)

app.get('/api/search',function(req,res){

  var returnObj = {};
  var userId = req.query.user;
  var uri = req.query.uri;

  db.model('Annotation').fetchByUri(uri).then(function(data){
    console.log(' !!!!!!!! ***  heres the data ', data.models[0].attributes.uri)
    var uriFilter = data.models.filter(function(e){
      if(e.attributes.uri === uri){
        console.log('e.attr ', e.attributes.uri,'userid ', e.attributes.user_id, 'uri ', uri);
      }
      return ( (e.attributes.uri == uri) && (e.attributes.user_id == userId));
    });
    console.log('******** uri filter', uriFilter);

    var returnArray = uriFilter.map(function(e){
      var resObj = {
        id: e.attributes.id,
        uri: e.attributes.uri,
        text: e.attributes.text,
        quote: e.attributes.quote,
        user_id: e.attributes.user_id,
        ranges: [
          {
            start: e.attributes.start,
            end: e.attributes.end,
            startOffset: e.attributes.startOffset,
            endOffset: e.attributes.endOffset
          }
        ]
       };
       return resObj;   
    });
    returnObj.rows = returnArray;   
    res.set('Content-Type', 'application/JSON');
    res.json(returnObj);
    res.end(); 
    });
  })

app.get('/api/search/users',function(req,res){
  var returnObj = {};
  var user_id = parseInt(req.query.user_id);
  db.model('Annotation').fetchByUserId(user_id).then(function(data){
    var idFilter = data.models.filter(function(e){
      return (e.attributes.user_id == user_id);
    });

    var returnArray = idFilter.map(function(e){
      var resObj = {
        id: e.attributes.id,
        uri: e.attributes.uri,
        text: e.attributes.text,
        quote: e.attributes.quote,
        user_id: e.attributes.user_id,
        ranges: [
          {
            start: e.attributes.start,
            end: e.attributes.end,
            startOffset: e.attributes.startOffset,
            endOffset: e.attributes.endOffset
          }
        ]
       };
       return resObj;   
    });
    returnObj.rows = returnArray;   
    res.set('Content-Type', 'application/JSON');
    res.json(returnObj);
    res.end();
  })



});  


app.listen(process.env.PORT || 8000);
console.log("Listening on port 8000...")