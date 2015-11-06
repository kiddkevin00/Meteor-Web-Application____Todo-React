// Task component - represents a single to-do item
Task = class extends React.Component {
  constructor(props) {
    super();
    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
  }

  render() {
    const taskClassName = (this.props.task.checked ? 'checked' : '') + ' ' +
      (this.props.task.private ? 'private' : '');
    return (
      <li className={taskClassName}>
        <button className='delete'
                onClick={this.deleteThisTask}>
          &times;
        </button>
        <input
          type='checkbox'
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked}
          />

        {this.props.isPrivateButtonShown ? (
          <button
            className='toggle-private'
            onClick={this.togglePrivate}>
            {this.props.task.private ? 'Private' : 'Public'}
          </button>
        ) : null}

        <span className='text'>
         <strong>{this.props.task.username || 'N/A'}</strong>
          : {this.props.task.text}
        </span>
      </li>
    );
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('removeTask', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  }

};
Task.propTypes = {
  task: React.PropTypes.object.isRequired,
  isPrivateButtonShown: React.PropTypes.bool.isRequired
};
