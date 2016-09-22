var _ = require('lodash');
var dog = require('../models/dog.js');

module.exports = function(app) {
  /*Create*/
  app.post('/dog', function (req, res) {
    var newdog = new dog(req.body);
    newdog.save(function(err){
      if(err){
        res.json({info:'error during car create', error:err});
      };
      res.json({info:'dog created successfully'});
    });
  });

  /*Read*/
  app.get('/dog', function (req, res) {
    dog.find(function(err, dogs){
      if(err){
        res.json({info:'error during find dogs', error:err});
      }
      res.json({info:'dogs found successfully', data: dogs});
    });
  });

  app.get('/dog/:id', function (req, res) {
    dog.find(req.params.id, function(err, dog){
      if(err){
        res.json({info:'error during find dog', error:err});
      }
      if(dog){
        res.json({info:'dog found successfully', data: dog});
      } else{
        res.json({info:'dog not found', data: dog});
      }
    });
  });

  /*Update*/
  app.put('/dog/:id', function (req, res) {
    dog.findById(req.params.id, function(err, dog){
      if(err){
        res.json({info:'error during find dog', error:err});
      }
      if(dog){
        _.merge(dog, req.body);
        dog.save(function (err) {
          if(err){
            res.json({info:'error during dog update', error:err});
          }
          res.json({info:'dog updated'});
        })
      } else{
        res.json({info:'dog not found', data: dog});
      }

    });
  });

  app.delete('/dog/:id', function (req, res){
    dog.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.json({info:'error during remove dog', error:err});
      }
      res.join({info: 'dog removed'});
    });
  });


}
