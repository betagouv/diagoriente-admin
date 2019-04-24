import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { pickBy, identity } from 'lodash';
import { Response } from 'requests';

type Request<T> = (...params: any[]) => Promise<Response<T>>;

type Requests<T extends object> = { [key in keyof T]: Request<T[key]> };

export type ApiComponentProps<R extends object> = {
  [K in keyof R]: {
    fetching: boolean;
    error: string;
    data: R[K];
    errors: any[];
    call: Requests<R>[K];
  }
};

type State = {
  [K: string]: {
    fetching: boolean;
    error: string;
    data: any;
    errors: any[];
  };
};

function withApis<R extends object, T extends Requests<R>>(
  requests: { [key in keyof R]: Request<R[key]> },
) {
  return <P, S>(
    WrappedComponent: React.ComponentType<
      ApiComponentProps<R> & RouteComponentProps & P
    >,
  ): React.ComponentType<RouteComponentProps & P> => {
    return class extends React.Component<RouteComponentProps & P, State> {
      constructor(props: RouteComponentProps & P) {
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

      calls: { [K in keyof T]: (params?: any) => Promise<Response<any>> };

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
            this.props.history.push('/login');
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
      }

      render() {
        const keys = Object.keys(requests);
        const injectedProps: any = keys.reduce((result, key) => {
          return {
            ...result,
            [key]: { ...this.state[key], call: this.calls[key as keyof R] },
          };
        },                                     {});

        return <WrappedComponent {...injectedProps} {...this.props} />;
      }
    };
  };
}

export default withApis;
