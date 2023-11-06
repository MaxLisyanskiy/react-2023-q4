import { Component, ErrorInfo, ReactNode } from 'react';
import errorIMG from '../../assets/error.jpg';
import './Error.css';

type IErrorBoundaryProps = {
  children?: ReactNode;
};

type IErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  public state: IErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ): IErrorBoundaryState {
    console.error('Uncaught error:', error, errorInfo);
    return { hasError: true };
  }

  private handleReloadPage = (): void => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h1 className="error__title">Error... Something went wrong!</h1>
          <img className="error__img" src={errorIMG} alt="error" />
          <button className="error__reload-btn" onClick={this.handleReloadPage}>
            Reload Page
          </button>
          ;
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
