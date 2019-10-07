import React, { Component } from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }
  }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

  render() {
    if (this.state.hasError) {
      return (
        <p className='error-boundary'>Sorry -- this page is temporarily unavailable</p>
      );
    }
    return this.props.children;
  };
}
