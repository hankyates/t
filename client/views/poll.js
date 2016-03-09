Template.pollDetails.events = {
  'click button[data-action="vote-on-poll"]': function(event){
    event.preventDefault();
    var userId = Meteor.userId();
    if (!userId) {
      Meteor.publish('Not logged In');
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

function participated() {
  var userId = Meteor.userId();
  // If the current user is anon they couldn't/shoundn't have participated.
  return userId ? !!Votes.findOne({userId}) : false;
}

Template.pollDetails.helpers({
  'voteCountForOption': function(){
    var pollOption = this;
    return Votes.find({option: pollOption.valueOf()}).count();
  },
  participated
});

Template.pollListItem.helpers({
  participated
});
