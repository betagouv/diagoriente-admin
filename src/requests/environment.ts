import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  IEnvironment,
  ListEnvironmentsParams,
  GetEnvironmentParams,
  CreateEnvironmentParams,
  DeleteEnvironmentParams,
  PatchEnvironmentparams,
  ListEnvironmentResponse
} from 'requests';

export const listEnvironment = (
  params?: ListEnvironmentsParams
): Promise<Response<ListEnvironmentResponse>> =>
  axiosGet('v1/environments', { params });

export const getEnvironment = ({
  id
}: GetEnvironmentParams): Promise<Response<IEnvironment>> =>
  axiosGet(`v1/environments/${id}`);

export const createEnvironment = (
  data: CreateEnvironmentParams
): Promise<Response<IEnvironment>> => axiosPost('v1/environments', { data });

export const deleteEnvironment = ({
  id
}: DeleteEnvironmentParams): Promise<Response<{}>> =>
  axiosDelete(`v1/environments/${id}`);

export const patchEnvironment = ({
  id,
  ...data
}: PatchEnvironmentparams): Promise<Response<IEnvironment>> =>
  axiosPatch(`v1/environments/${id}`, { data });
