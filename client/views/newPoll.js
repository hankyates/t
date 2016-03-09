Template.newPoll.events = {
  'click button[data-action="create-new-poll"]': function(event){
    event.preventDefault();
    var userId = Meteor.userId();
    if (!userId) {
      Session.set('modalMessage', 'Please log in to post a comment.');
      Modal.show('messageModal');
      return;
    }
    var template = Template.instance();
    Polls.insert({
      userId,
      title: template.$('#newPollTitle').val(),
      description: template.$('#newPollDescription').val(),
      active: true,
      expires: moment().add(1, 'days').valueOf(),
      timestamp: moment().valueOf(),
      options: [
        'Yes',
        'No'
      ]
    });
  }
};
