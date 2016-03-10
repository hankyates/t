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
  return {
    title,
    expires,
    description,
    _id,
    votes: Votes.find({pollId: _id}).map(voteMap)
  };
}

function polls() {
  var now = Date.now();
  return Polls
    .find()
    .map(pollMap)
    .filter(p => (p.expires - now) > 0);
}

Template.homePage.helpers({
  polls
});
