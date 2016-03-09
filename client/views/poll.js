Template.pollDetails.events = {
  'click button[data-action="vote-on-poll"]': function(event){
    event.preventDefault();
    var userId = Meteor.userId();
    if (!userId) {
      Session.set("modalMessage", "Please log in to post a comment.");
      Modal.show('messageModal');
      return;
    }
    var poll = Template.currentData();
    var pollOption = this;
    Votes.insert({
      userId,
      pollId: poll && poll._id,
      timestamp: moment().valueOf(),
      option: pollOption.valueOf()
    });
  }
};

function participated(pollId) {
  var userId = Meteor.userId();
  // If the current user is anon they couldn't/shoundn't have participated.
  return userId ? !!Votes.findOne({userId, pollId}) : false;
}

Template.pollDetails.helpers({
  'voteCountForOption': function(){
    var pollOption = this;
    return Votes.find({option: pollOption.valueOf()}).count();
  },
  canVote: (pollId) => !!Meteor.user() && !participated(pollId),
  participated
});

Template.pollListItem.helpers({
  participated
});
