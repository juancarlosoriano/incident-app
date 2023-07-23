let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a User model class

let User = mongoose.Schema({
    name: String,
    username: String,
    email: String
},
{
    collection: 'user'
})

// configure options for User Model

let options = ({missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);