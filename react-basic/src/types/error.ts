import { ReactNode } from 'react';

export type IErrorBtnProps = {
  children?: JSX.Element;
};

export type IErrorBtnState = {
  error: boolean;
};

export type IErrorBoundaryProps = {
  children?: ReactNode;
};

export type IErrorBoundaryState = {
  hasError: boolean;
};
