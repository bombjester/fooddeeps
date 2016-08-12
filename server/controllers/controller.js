var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var Pics = mongoose.model('pics');
var Users = mongoose.model('users');


//Time 
var today = new Date();
var day = today.getDay();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var days = ['Sunday', 'Monday', "Tuesday" , "Wednesday", "Thursday", "Friday" , "Saturday"];
day = days[day];
if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = day + ', ' + mm +'/'+dd + '/' + yyyy;


//cloud server
cloudinary.config({ 
  cloud_name: 'bombjester', 
  api_key: '943286385814915', 
  api_secret: '-5SIhbPl2XxWSP4ZvJE6Nq6uP0w' 
});



module.exports = (function() {
	return{


		upload: function(req,res){
			
			cloudinary.v2.uploader.upload(req.body.base64,
    			function(error, result) {
    				//console.log(result.url);
    				var insert = new Pics({name: req.body.user, url: result.url, votes: 0, created_at: today});
    					insert.save(function(err, results){
							if (err){
								res.json("failed adding pic to MongoDB");
							}
							else{
								Pics.find({}, function(err,result){
									res.json(result);
								})
							}
						})
    			});
		},

		getallpics: function(req,res){
			Pics.find({}, function(err,results){
				if (err){
					console.log("error findings");
				}
				else{
					res.json(results);
				}
			})
		},

		vote: function(req,res){
			var same = false;
			var author = "";
			Pics.find({_id: req.body._id}, function(err1,res1){		
				if (req.body.user == res1[0].name){
					same = true;
				}
				author = res1[0].name;

			});	

			Users.find({name: req.body.user}, function(err,rez){
				//console.log(rez[0].voted , 'get here');
				if (rez[0].voted == "Yes"){
					res.json("Already Voted");
				}
				else if (same == true){
					res.json("Cannot vote for your own pic");
				}
				else{
					//console.log(author, "get here");
					Users.update({name: author}, {$inc: {deeps: 1}},function(input, output){
						//console.log("updated deeps");
					});
					Pics.update({_id: req.body._id}, {$inc: {votes: 1}}, function(err, result){
						if (err){
							console.log("Error in voting");
						}
						else{
							Pics.find({}, function(errz,results){
								Users.update({name: req.body.user}, {$set: {voted:"Yes", cd: today }}, function(errs, res){
									//console.log(res, "voted yes");
								})
								res.json(results);
							})
						}
					})
				}
			})
			
		},
		register: function(req,res){
			
			var hashedPassword = passwordHash.generate(req.body.password);
			var insert = new Users ({name: req.body.name, password: hashedPassword, voted: "No", cd: "0", deeps:0});
			insert.save(function(err,results){
				if (err){
						
						res.json("Username Taken!");
					}
					else{
						res.json(results);
					}
			})
		},


		login: function(req,res){
			Users.find({name: req.body.name}, function(err, result){

				if (result.length == 0){
					res.json("No User");
				}
				else{
					if( passwordHash.verify(req.body.password, result[0].password)){
					
						if(result[0].cd != today){
							
							Users.update({_id: result[0]._id}, {$set:{voted: "No"}}, function(res,req){
							});
						}
						res.json(result[0].name);
					}
					else{
						res.json("Password Wrong");
					}
				}		
			})
		},

		getallusers: function(req,res){
			Users.find({}, function(err,result){
				if(err){
					console.log("error finding users");
				}
				else{
					res.json(result);
				}
			})
		},












































	}
})();