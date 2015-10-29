// App component - represents the whole app
App = React.createClass({
  // This mixin makes the `getMeteorData()` method work
  mixins: [ReactMeteorData],
  // Loads items from the `Tasks` collection and puts them on `this.data.tasks`
  getMeteorData() {
    let query = {};
    if (this.state.hideCompleted) query = {checked: {$ne: true}};

    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  getInitialState() {
    return {
      hideCompleted: false
    };
  },
  render() {
    return (
      <div className='container'>
        <header>
          <h1>To-do List - {this.data.incompleteCount}</h1>
          <label className='hide-completed'>
            <input
              type='checkbox'
              checked={this.state.hideCompleted}
              onChange={this.toggleHideCompleted}
              />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          {this.data.currentUser ? (
            <form
              className='new-task'
              onSubmit={this.handleSubmit}>
              <input
                type='text'
                ref='textInput'
                placeholder='Type to add a new task'
                />
            </form>
          ) : null}
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },
  handleSubmit(event) {
    // prevents browser navigation (refresh)
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
    if (text) {
      Tasks.insert({
        owner: Meteor.userId(), // `_id` attribute of logged in user
        username: Meteor.user().username,
        text: text,
        createdAt: new Date()
      });
    } else {
      alert('Invalid input. Please try again!');
    }

    // Clear form
    React.findDOMNode(this.refs.textInput).value = '';
  },
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

});
