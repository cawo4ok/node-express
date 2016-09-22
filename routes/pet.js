var r = require('request').defaults({
  json:true
});

var async = require('async');

module.exports = function (app) {

  /* Read */
  app.get('/pet', function (req, res) {

    async.parallel({
      cat: function (callback) {
        r({url:'http://localhost:3000/cat'}, function (error, response, body) {
          if(error){
            callback({service:'cat', error: error});
            return;
          }
          if(!error && response.statusCode === 200) {
            callback(null, body);
          } else {
            callback(response.statusCode);
          }
        });
      },
      dog: function (callback) {
        r({url:'http://localhost:3001/dog'}, function (error, response, body) {
          if(error){
            callback({service:'dog', error: error});
            return;
          }
          if(!error && response.statusCode === 200) {
            callback(null, body);
          } else {
            callback(response.statusCode);
          }
        });
      }
    },function(error, results) {
      res.json({
        error: error,
        results: results
      });
    });



  });
};