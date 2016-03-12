//****************
//PUBLICATIONS
//****************

Meteor.publish('polls', function () {
  check(arguments, [Match.Any]);
  return Polls.find({});
});


Meteor.publish('pollDetails', function (pollId) {
  check(pollId, String);
  return [
    Polls.find({_id: pollId}),
    Votes.find({pollId: pollId})
  ];
});

Meteor.publish('homePage', function (size, from) {
  check(size, Number);
  check(from, Number);

  var polls = Polls.find({}, {limit: size + from});
  var ids = polls.fetch().map(p => p._id);
  var votes = Votes.find({pollId: {$in: ids}});

  return [
    polls,
    votes,
  ];
});
