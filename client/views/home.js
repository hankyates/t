function voteMap(vote) {
  var {option, _id, userId} = vote;
  return {
    option,
    id: _id,
    user: Users.findOne({userId})
  };
}

function pollMap(poll) {
  var {title, description, _id} = poll;
  return {
    title,
    description,
    id: _id,
    votes: Votes.find({pollId: _id}).map(voteMap)
  };
}

function polls() {
  return Polls.find().map(pollMap);
}

Template.homePage.helpers({
  polls
});
