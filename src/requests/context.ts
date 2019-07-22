import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  IContext,
  ListContextsParams,
  GetContextParams,
  CreateContextParams,
  PatchContextparams,
  ListContextResponse,
} from 'requests';

export const listContext = (
  params?: ListContextsParams,
): Promise<Response<ListContextResponse>> =>
  axiosGet('v1/contexts', { params });

export const getContext = ({
  id,
}: GetContextParams): Promise<Response<IContext>> =>
  axiosGet(`v1/contexts/${id}`);

export const createContext = (
  data: CreateContextParams,
): Promise<Response<IContext>> => axiosPost('v1/contexts', { data });


export const patchContext = ({
  id,
  ...data
}: PatchContextparams): Promise<Response<IContext>> =>
  axiosPatch(`v1/contexts/${id}`, { data });
