var User = require('../models/User');
var Message = require('../models/Message');
var Conversation = require('../models/Conversation');

var chatController = {};

chatController.chatHome = (req, res) => {
	console.log("<<<<<<<<<<<<<<<<<<<<", req.params);
	var userList = [];
    User.find({}, (err, users)=>{
		// console.log(users);
        users.map((user) => userList.push({nickname:user.nickname, el_pastas:user.username}));    
		res.render('chat/chat', {userList: userList, user: req.user});
		console.log("user>>>>>>>", req.user._id);
	});
}

chatController.sendMessage = (req, res, next) => {
	console.log(req.params);
	if(!req.params.recipient) {
		res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
		return next();
	  }
	
	  if(!req.body.composedMessage) {
		res.status(422).send({ error: 'Please enter a message.' });
		return next();
	  }
	
	  const conversation = new Conversation({
		participants: [req.user._id, req.params.recipient]
	  });
	
	  conversation.save(function(err, newConversation) {
		if (err) {
		  res.send({ error: err });
		  return next(err);
		}
	
		const message = new Message({
		  conversationId: newConversation._id,
		  body: req.body.composedMessage,
		  author: req.user._id
		});
	
		message.save(function(err, newMessage) {
		  if (err) {
			res.send({ error: err });
			return next(err);
		  }
	
		  res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
		  return next();
		});
	  });
}

module.exports = chatController;