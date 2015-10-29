// Task component - represents a single to-do item
Task = class extends React.Component {
  constructor(props) {
    super();
    this.toggleChecked = this.toggleChecked.bind(this);
    this.deleteThisTask = this.deleteThisTask.bind(this);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <li className={taskClassName}>
        <button className='delete' onClick={this.deleteThisTask}>&times;</button>
        <input
          type='checkbox'
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked}
          />
        <span className='text'>
         <strong>{this.props.task.username || 'N/A'}</strong>
          : {this.props.task.text}
        </span>
      </li>
    );
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: {
        checked: !this.props.task.checked
      }
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }
};
Task.propTypes = {
  task: React.PropTypes.object.isRequired
};
