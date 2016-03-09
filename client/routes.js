Router.configure({
  layoutTemplate: "defaultLayout",
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  progressDelay: 200
});

Router.map(function() {
  this.route('/', {
    name: 'home',
    path: '/',
    waitOn: function () {
      return Meteor.subscribe('homePage');
    },
    action: function () {
      this.render('homePage');
    }
  });

  this.route('/poll/create', {
    name: 'newPoll',
    path: '/poll/create',
    action: function () {
      this.render('newPoll');
    },
    onAfterAction: function() {
      var newPollEl = document.getElementById('newPoll');
      if (newPollEl) {
        React.render(React.createElement(NewPoll), newPollEl);
      }
    }
  });

  this.route('/poll/:_id', {
    name: 'pollDetails',
    path: '/poll/:_id',
    waitOn: function () {
      return Meteor.subscribe('pollDetails', this.params._id);
    },
    action: function () {
      this.render('pollDetails', {
        data: function () {
          return Polls.findOne({_id: this.params._id});
        }
      });
    }
  });
});
