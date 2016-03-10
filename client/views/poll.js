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
    Router.go('/');
  }
};

function currentUsersVote(pollId) {
  var userId = Meteor.userId();
  var vote = Votes.findOne({userId, pollId});
  return (vote && vote.option) || '';
}

function participated(poll) {
  var {_id} = poll;
  var userId = Meteor.userId();
  // If the current user is anon they couldn't/shoundn't have participated.
  return userId ? !!currentUsersVote(_id) : false;
}

function expired(poll) {
  return (poll.expires - Date.now()) <= 0;
}

function not(f) {
  return function () {
    return !f.apply(this, arguments);
  }
}

var userCanVote = (poll) => !!Meteor.user() && !participated(poll)

Template.pollDetails.helpers({
  'voteCountForOption': function(){
    var pollOption = this;
    return Votes.find({option: pollOption.valueOf()}).count();
  },
  userCanVote,
  votingEnabled: (poll) => _.every([not(expired), userCanVote], f => f(poll)),
  showResults: (poll) => _.any([expired, participated], f => f(poll)),
  currentUsersVote,
  expired,
  participated
});

Template.pollListItem.helpers({
  when: poll => moment(poll.expires).format('YYYY-MM-DD HH:mm'),
  participated,
  expired,
  currentUsersVote
});
