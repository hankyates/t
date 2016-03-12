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
      if (!this.from && !this.size) {
        this.from =  new ReactiveVar(Session.get('from') || 0);
        this.size = 1;
      }
      Session.set('from', this.from.get());
      return Meteor.subscribe('homePage', this.size, this.from.get());
    },
    action: function () {
      this.render('homePage', {
        data: function() {
          return {size: this.size, from: this.from};
        }
      });
    }
  });

  this.route('/poll/create', {
    name: 'newPoll',
    path: '/poll/create',
    action: function () {
      this.render('newPoll');
      Template.newPoll.rendered = function() {
        var contentEl = document.getElementById('newPoll');
        if (contentEl) {
          ReactDOM.render(React.createElement(NewPoll), contentEl);
        }
      };
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
