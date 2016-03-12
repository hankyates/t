Polls.allow({
  insert: function(userId, doc){
    return !!userId && !!doc.title;
  },
  update: function(userId, doc, fields, modifier){
    return doc.userId === userId;
  },
  remove: function(userId, doc){
    return doc.userId === userId;
  }
});

Votes.allow({
  insert: function(userId, doc){
    var canVote = Votes.find({userId, pollId: doc.pollId}).count() < 1;
    return !!userId && canVote;
  },
  update: function(userId, doc, fields, modifier){
    return doc.userId === userId;
  },
  remove: function(userId, doc){
    return doc.userId === userId;
  }
});
