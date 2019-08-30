import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { pickBy, identity } from 'lodash';
import { Response } from 'requests';

export type ReturnPromiseType<T> = T extends (...args: any[]) => Promise<Response<infer ReturnType>>
  ? ReturnType
  : any;

interface IApiState<T> {
  fetching: boolean;
  error: string;
  data: T;
  errors: any[];
}

export type ApiComponentProps<
  R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }
> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: ReturnPromiseType<R[K]>;
    errors: any[];
    call: R[K];
  };
};

type State = {
  [K: string]: {
    fetching: boolean;
    error: string;
    data: any;
    errors: any[];
  };
};

function withApis<R extends { [key: string]: (...args: any[]) => Promise<Response<any>> }>(
  requests: R,
) {
  return <P extends ApiComponentProps<R>, S>(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<Omit<P, keyof ApiComponentProps<R>>> => {
    return class extends React.Component<Omit<P, keyof ApiComponentProps<R>>, State> {
      constructor(props: Omit<P, keyof ApiComponentProps<R>>) {
        super(props);
        const state: any = {};
        const calls: any = {};
        Object.keys(requests).forEach(key => {
          state[key] = {
            fetching: false,
            error: '',
            data: {},
            errors: [],
          };
          calls[key] = this.callApi(key);
        });
        this.state = state;
        this.calls = calls;
      }

      calls: any;

      callApi = (key: string) => async (...params: any[]) => {
        try {
          const apiParams = params.map(param =>
            typeof param === 'object' ? pickBy(param, identity) : param,
          );
          this.setState(state => ({
            [key]: { ...state[key], fetching: true, error: '', errors: [] },
          }));
          const response = await requests[key as keyof R](...apiParams);
          if (response.code >= 200 && response.code < 400 && response.data) {
            this.setState(state => ({
              [key]: { ...state[key], fetching: false, data: response.data },
            }));
          } else if (response.code === 401) {
            // this.props.history.push('/login');
          } else {
            const errors: { error?: string; errors?: any[] } = {};
            if (response.message) errors.error = response.message;
            if (response.errors) errors.errors = response.errors;
            this.setState(state => ({
              [key]: { ...state[key], fetching: false, ...errors },
            }));
          }
        } catch (e) {
          this.setState(state => ({
            [key]: {
              ...state[key],
              fetching: false,
              error:
                "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.",
            },
          }));
        }
      };

      render() {
        const keys = Object.keys(requests);
        const injectedProps: any = keys.reduce((result, key) => {
          return {
            ...result,
            [key]: { ...this.state[key], call: this.calls[key as keyof R] },
          };
        }, {});

        return <WrappedComponent {...injectedProps} {...this.props} />;
      }
    };
  };
}

export default withApis;
