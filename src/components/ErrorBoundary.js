import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error.message);
    console.log(error.stack);
    console.log(errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="snap">
          <div className="snap-message">
            <p>We're sorry - something's gone wrong.</p>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;