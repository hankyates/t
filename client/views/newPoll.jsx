const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';

NewPoll = React.createClass({

  getInitialState: function() {
    var oneDayFromNow = moment().add(1, 'days');
    return {
      title: '',
      description: '',
      expiresDate: oneDayFromNow,
      expiresTime: oneDayFromNow,
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
    var {title, description, options, expiresDate, expiresTime} = this.state;
    var expires = moment(
      `${expiresDate.format('YYYY-MM-DD')} ${expiresTime.format('HH:mm')}`,
      'YYYY-MM-DD HH:mm'
    ).valueOf();
    Polls.insert({
      userId,
      title,
      description,
      expires,
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
   this.setState({
     options: options.map((o, i) => i === index ? event.target.value : o)
   });
  },

  dateChange: function(e) {
    this.setState({expiresDate: moment(e.currentTarget.value, DATE_FORMAT)});
  },

  timeChange: function(e) {
    this.setState({expiresTime: moment(e.currentTarget.value, TIME_FORMAT)});
  },

  render: function() {
    var {options, expiresDate, expiresTime} = this.state;
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
          {options.map((v, i) => <input type="text" onChange={e => this.choiceChange(e, i)} defaultValue={v}/>)}
          <button className="btn btn-default" onClick={this.addChoice}>Add a choice</button>
        </div>
        <div className="row">
          <label htmlFor="expires">Poll Expires On:</label>
          <input name="expires" onChange={this.dateChange} type="date" defaultValue={expiresDate.format(DATE_FORMAT)}/>
          <label htmlFor="time">at</label>
          <input name="time" onChange={this.timeChange} type="time" defaultValue={expiresTime.format(TIME_FORMAT)}/>
        </div>
        <div className="row">
          <a href="/" className="btn btn-default">Cancel</a>
          <button className="btn btn-success" onClick={this.createPollHandler}>Create Poll</button>
        </div>
      </div>
    </div>;
  }
});
