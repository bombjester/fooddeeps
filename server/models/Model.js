var mongoose = require('mongoose');

var PicSchema = new mongoose.Schema({
	name: String,
  	url: String, 
  	votes: Number,
  	created_at: String,
});

var UserSchema = new mongoose.Schema({
	name: {type: String, unique:true},
	password: String,
	voted: String,
	cd: String,
	deeps: Number,
})

mongoose.model('pics', PicSchema);
mongoose.model('users', UserSchema);