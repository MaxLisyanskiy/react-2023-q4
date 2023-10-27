import { Component } from 'react';
import { IErrorBtnProps, IErrorBtnState } from '../../types/error';
import './Error.css';

class ErrorBtn extends Component<IErrorBtnProps, IErrorBtnState> {
  public state: IErrorBtnState = {
    error: false,
  };

  public componentDidUpdate(_: IErrorBtnProps, prevState: IErrorBtnState): void {
    if (this.state.error !== prevState.error) {
      throw new Error('Пример ошибки');
    }
  }

  private handleThrowError = (): void => {
    this.setState({ error: true });
  };

  public render() {
    return (
      <button className="error_btn" onClick={this.handleThrowError}>
        Throw Error?
      </button>
    );
  }
}

export default ErrorBtn;
