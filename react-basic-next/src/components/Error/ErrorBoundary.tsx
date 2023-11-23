import Image from 'next/image';
import { Component, ErrorInfo, ReactNode } from 'react';
import classes from './Error.module.scss';

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
        <div className={classes.page}>
          <h1 className={classes.title}>Error... Something went wrong!</h1>
          <Image
            className={classes.img}
            src="/error.webp"
            width={500}
            height={500}
            alt="error-boundary-img"
          />
          <button className={classes.reloadBtn} onClick={this.handleReloadPage}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
