// Accounts UI Wrapper component - wrap login UI component (Blaze)
AccountsUIWrapper = class extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      React.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref='container' />;
  }
};
