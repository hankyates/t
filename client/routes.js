Router.configure({
  layoutTemplate: "defaultLayout",
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  progressDelay: 200
});

function unmountReact() {
  var contentEl = document.getElementById('content');
  if (contentEl) {
    ReactDOM.unmountComponentAtNode(contentEl);
  }
  this.next();
}

Router.map(function() {
  this.route('/', {
    name: 'home',
    path: '/',
    onBeforeAction: unmountReact,
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
      this.render();
      var contentEl = document.getElementById('content');
      if (contentEl) {
        ReactDOM.render(React.createElement(NewPoll), contentEl);
      }
    }
  });

  this.route('/poll/:_id', {
    name: 'pollDetails',
    path: '/poll/:_id',
    onBeforeAction: unmountReact,
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
