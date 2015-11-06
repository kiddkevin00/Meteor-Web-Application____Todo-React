// Define a collection to hold our tasks
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.subscribe('tasks');

  Meteor.startup(() => {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById('render-target'));
  });
}

if (Meteor.isServer) {
  Meteor.publish('tasks', function() {
    return Tasks.find({
      $or: [
        {private: {$ne: true}},
        {owner: this.userId}
      ]
    });
  });
}

Meteor.methods({
  addTask(text) {
    if (!Meteor.userId()) {
      throw new Error('not-authorized');
    }

    Tasks.insert({
      text: text,
      createAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      private: false
    });
  },
  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  setChecked(taskId, isChecked) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {checked: isChecked}
    });
  },
  setPrivate(taskId, isPrivate) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, {
      $set: {private: isPrivate}
    });
  }

});
