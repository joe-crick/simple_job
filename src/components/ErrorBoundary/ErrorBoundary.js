import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log("error:", error);
    console.log("info:", info);
    // TODO: Implement real error handling and logging
  }

  render() {
    if (this.state.hasError) {
      // TODO: Determine if this is a recoverable error, or if messaging is necessary;
      console.log("Your old friend, console.log here... Ooops.");
    }
    return this.props.children;
  }
}
