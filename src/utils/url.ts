import { map } from 'lodash';

export const encodeUri = (params: {
  [key: string]: number | string | boolean;
}) => {
  return `?${map(
    params,
    (param, key) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(param as string)}`,
  ).join('&')}`;
};

const iterator = <T>(
  iterable: IterableIterator<T>,
  callback: (value: T) => void,
): void => {
  const next = iterable.next();
  if (next.value) {
    callback(next.value);
  }
  if (next.done) {
    return;
  }
  iterator(iterable, callback);
};

export const decodeUri = (uri: string = ''): { [key: string]: any } => {
  const urlSearch = new URLSearchParams(uri) as any;
  const urlSearchParams: { [key: string]: string } = {};

  iterator(urlSearch.entries(), (param: string[]) => {
    urlSearchParams[param[0]] = param[1];
  });

  return urlSearchParams;
};
