var doge = require("./../controllers/controller.js");

module.exports = function(app){
	app.post('/upload', function(req,res){
		doge.upload(req,res);
	})
	app.get('/gettodaypics', function(req,res){
		doge.gettodaypics(req,res);
	})
	app.get('/getoldpics', function(req,res){
		doge.getoldpics(req,res);
	})
	app.post('/votes', function(req,res){
		doge.vote(req,res);
	})
	app.post('/register', function(req,res){
		doge.register(req,res);
	})
	app.post('/login', function(req,res){
		doge.login(req,res);
	})
	app.get('/getallusers', function(req,res){
		doge.getallusers(req,res);
	})
	app.get('/getallpics', function(req,res){
		doge.getallpics(req,res);
	})
}