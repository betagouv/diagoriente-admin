import axios, { AxiosResponse } from 'axios';
import { Response } from 'requests';

const BaseURL = process.env.REACT_APP_API_URL || 'https://api2.projetttv.org';

export let authorizationBearer: string | null = null;

export const setAuthorizationBearer = (token: string | null) => {
  authorizationBearer = token;
};

type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

function axiosRequest<T, P>(method: Method, baseURL: string, url: string, params: P, headers: any): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      timeout: 300000,
      ...params,
      headers: {
        ...headers,
      },
    })
      .then(
        (payload: AxiosResponse<T>) => {
          resolve({ data: payload.data, code: payload.status });
        },
        (payload: any) => {
          if (payload.response) {
            const { response } = payload;
            if (response.status >= 400 && response.status < 500) {
              resolve(response.data);
            } else {
              reject(response);
            }
          } else {
            reject(payload);
          }
        },
      )
      .catch((e) => {
        throw e;
      });
  });
}

/* ------ Request POST ------ */
export const axiosPost = <T, P extends object>(url: string, params?: P, timeout = null): Promise<Response<T>> => {
  let p: any = {
    sendToken: true,
    data: {},
    headers: {},
  };

  if (params) {
    p = { ...p, ...params };
  }

  const headers = p.headers;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('POST', BaseURL, url, reqParams, headers);
};

/* ------ Request PUT ------ */
export const axiosPut = <T, P extends object>(url: string, params?: P, timeout = null): Promise<Response<T>> => {
  let p: any = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const headers = p.headers;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PUT', BaseURL, url, reqParams, headers);
};

/* ------ Request PATCH ------ */
export const axiosPatch = <T, P extends object>(url: string, params?: P, timeout = null): Promise<Response<T>> => {
  let p: any = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const headers = p.headers;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('PATCH', BaseURL, url, reqParams, headers);
};

/* ------ Request GET ------ */
export const axiosGet = <T, P extends object>(url: string, params?: P, timeout = null): Promise<Response<T>> => {
  let p: any = { sendToken: true, params: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  const headers = p.headers;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { params: P; timeout?: number | null } = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('GET', BaseURL, url, reqParams, headers);
};

/* ------ Request DELETE ------ */
export const axiosDelete = <T, P extends object>(url: string, params?: P, timeout = null): Promise<Response<T>> => {
  let p: any = { sendToken: true, headers: {}, ...params };
  if (params) {
    p = { ...p, ...params };
  }
  const headers = p.headers;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { params: P; timeout?: number | null } = {
    params: p.params,
  };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('DELETE', BaseURL, url, reqParams, headers);
};

/* ------ Request POST files ------ */
export const axiosPostFilesData = <T, P extends object>(url: string, params?: P, timeout = 60000): Promise<Response<T>> => {
  const p: any = {
    sendToken: true,
    form: {},
    headers: {},
    ...params,
  };
  const { headers } = p;

  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  const reqParams: { data: P; timeout?: number | null } = { data: p.data };
  if (timeout) {
    reqParams.timeout = timeout;
  }
  return axiosRequest('POST', BaseURL, url, reqParams, headers);
};
