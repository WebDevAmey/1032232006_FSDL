import './ErrorBoundary.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="kg-error-boundary">
          <div className="kg-error-boundary__card">
            <h2 className="kg-error-boundary__title">Something went wrong.</h2>
            <p className="kg-error-boundary__text">This page hit an unexpected snag. You can head home and keep exploring.</p>
            <Link className="kg-error-boundary__link" to="/">
              Go home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
