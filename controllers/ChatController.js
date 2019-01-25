var User = require("../models/User");
var Message = require("../models/Message");
var Conversation = require("../models/Conversation");

var chatController = {};

chatController.chatHome = (req, res, next) => {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.user._id })
	.select("_id participants")
	.populate('participants')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
	  }
	  console.log('conversations >>>>', conversations[0].participants[0]);
	

      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(function(conversation) {
        Message.find({ conversationId: conversation._id })
          .sort("-createdAt")
          .limit(1)
          .populate({
            path: "author",
            select: "nickname _id"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push(message);
            // console.log(fullConversations);
            if (fullConversations.length === conversations.length) {

              // Find all Users
              let userList = [];
              User.find({}, (err, users) => {
                // console.log(users);
                let selectedUserID = "";
                users.map(user => {
                  let userid1 = String(user._id);
                  let userid2 = String(req.user._id);
                  if (userid1 !== userid2) {
                    userList.push({
                      nickname: user.nickname,
                      el_pastas: user.username,
                      id: user._id
                    });
                  }
				});
				console.log("fullConversations >>>>>",fullConversations)
                res.render("chat/chat", {
                  userList: userList,
                  user: req.user,
                  selectedUserID: selectedUserID,
				  conversations: fullConversations,
				  conversationList : conversations				  
                });
              });
            }
          });
	  });
	//   console.log("fullConversations >>>>>",fullConversations)
    });
};

chatController.loadConversation = (req, res, next) => {
  Message.find({ conversationId: req.params.id })
    .select("createdAt body author")
    .sort("-createdAt")
    .populate({
      path: "author",
      select: "nickname _id"
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
	  }
	  console.log("messages >>>", messages);
      let userList = [];
      User.find({}, (err, users) => {
        // console.log(users);
        users.map(user => {
          let userid1 = String(user._id);
          let userid2 = String(req.user._id);
          if (userid1 !== userid2) {
            userList.push({
              nickname: user.nickname,
              el_pastas: user.username,
              id: user._id
            });
          }
        });
        res.render("chat/chat", {
          conversation: messages,
          userList: userList,
          user: req.user,
          selectedUserID: req.params.id
        });
      });
      // res.render('chat/chat', { conversation: messages, userList: userList, user: req.user });
      //   res.status(200).json({ conversation: messages });
    });
};

chatController.loadOne = (req, res, next) => {
	Message.find({ conversationId: req.params.id })
    .select('createdAt body author')
    .sort('createdAt')
    .populate({
      path: 'author',
      select: 'nickname _id'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
	  }

	  let diffArray = [];
	  messages.forEach(message => {
		let diff = Math.abs(new Date() - new Date(message.createdAt));
		let minutes = Math.floor((diff/1000)/60);
			// console.log("minutes>>>",minutes);
			// console.log("message>>>",message);
		  	diffArray.push(minutes);
	  })
	  console.log("essagessssss",diffArray)
      res.render('chat/conversation',{ conversation: messages, convID: req.params.id, diffArray: diffArray, user: req.user });
    });
}

chatController.doReply = (req, res, next) => {
	console.log("reply >>>>", req.params);
	const reply = new Message({
		conversationId: req.params.id,
		body: req.body.composedMessage,
		author: req.user._id
	  });
	
	  reply.save(function(err, sentReply) {
		if (err) {
		  res.send({ error: err });
		  return next(err);
		}
			res.redirect(`/chat/${req.params.id}`);
		// res.status(200).json({ message: 'Reply successfully sent!' });
		// return(next);
	  });
}



chatController.sendMessage = (req, res, next) => {
  console.log(req.params);
  if (!req.params.id) {
    res
      .status(422)
      .send({ error: "Please choose a valid recipient for your message." });
    return next();
  }

  if (!req.body.composedMessage) {
    res.status(422).send({ error: "Please enter a message." });
    return next();
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.params.id]
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
	  res.redirect(`/chat/${req.params.id}`);
	//    {
    //     message: "Conversation started!",
    //     conversationId: conversation._id
    //   });
      //   res.status(200).json({
      //     message: "Conversation started!",
      //     conversationId: conversation._id
      //   });
      return next();
    });
  });
};

module.exports = chatController;
