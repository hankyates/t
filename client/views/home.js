function score(poll, votes, participated = this) {
  var now = Date.now();
  var left = (poll.expires - now) / (100 * 60); // Convert to minutes.
  return (100000 / left) + (15 * votes) + (100 * participated);
}

function voteMap(vote) {
  var {option, _id, userId} = vote;
  return {
    option,
    _id,
    user: Users.findOne({userId})
  };
}

function pollMap(poll) {
  var {title, expires, description, _id} = poll;
  var votes = Votes.find({pollId: _id}).map(voteMap);
  var p = Template.pollDetails.__helpers.get('participated');
  var participated = p(poll) ? 0 : 1;
  return {
    score: score(poll, votes.length, participated),
    title,
    expires,
    description,
    _id,
    votes
  };
}

function polls() {
  var now = moment().subtract(1, 'days').valueOf();
  return _.sortBy(Polls
    .find()
    .map(pollMap)
    .filter(p => (p.expires - now) > 0), 'score').reverse();
}

Template.homePage.helpers({
  polls
});

Template.homePage.events = {
  'click button[data-action="load-more"]': function(event){
    this.from.set(this.size + this.from.get());
  }
};
