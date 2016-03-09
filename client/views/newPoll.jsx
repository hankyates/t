NewPoll = React.createClass({

  getInitialState: function() {
    return {
      title: '',
      description: '',
      options: ['Yes', 'No']
    }
  },

  createPollHandler: function() {
    var userId = Meteor.userId();
    if (!userId) {
      Session.set('modalMessage', 'Please log in to post a comment.');
      Modal.show('messageModal');
      return;
    }
    var {title, description, options} = this.state;
    Polls.insert({
      userId,
      title,
      description,
      active: true,
      expires: moment().add(1, 'days').valueOf(),
      timestamp: moment().valueOf(),
      options
    });
    Router.go('/');
  },

  addChoice: function() {
    var {options} = this.state;
    this.setState({options: [...options, '']});
  },

  choiceChange: function(event, index) {
   var {options} = this.state;
   this.setState({options: options.map((o, i) => i === index ? event.target.value : o)});
  },

  render: function() {
    var {options} = this.state;
    return <div className="text-center">
      <div className="new-poll-dialogue">
        <h4>Create New Poll</h4>
        <div className="row">
          <input onChange={e => this.setState({title: e.target.value})} type="text" placeholder="Poll Title"/>
        </div>
        <div className="row">
          <textarea onChange={e => this.setState({description: e.target.value})} placeholder="Description of what we're voting on"></textarea>
        </div>
        <div className="row">
          {options.map((v, i) => <input key={v+i} type="text" onChange={e => this.choiceChange(e, i)} defaultValue={v}/>)}
          <button className="btn btn-default" onClick={this.addChoice}>Add a choice</button>
        </div>
        <div className="row">
          <a href="/" className="btn btn-default">Cancel</a>
          <button className="btn btn-success" onClick={this.createPollHandler}>Create Poll</button>
        </div>
      </div>
    </div>;
  }
});
