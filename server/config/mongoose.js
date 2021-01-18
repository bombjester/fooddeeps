var mongoose = require('mongoose');
// require file-system so that we can load, read, require all of the model files
var fs = require('fs');
// connect to the database
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://admin:1234@ds123976.mlab.com:23976/food_deeps');
mongoose.connect('mongodb://admin:1234@food-deeps-shard-00-00.qlmwu.mongodb.net:27017,food-deeps-shard-00-01.qlmwu.mongodb.net:27017,food-deeps-shard-00-02.qlmwu.mongodb.net:27017/food_deeps?ssl=true&replicaSet=atlas-aautkb-shard-0&authSource=admin&retryWrites=true&w=majority');
// specify the path to all of the models
var models_path = __dirname + '/../models'
// read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})
