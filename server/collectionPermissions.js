var permissions = {
  insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc, fields, modifier){
    return doc.userId === userId;
  },
  remove: function(userId, doc){
    return doc.userId === userId;
  }
};

Polls.allow(permissions);
Votes.allow(permissions);
