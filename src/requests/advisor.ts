import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  Iadvisor,
  ListAdvisorsParams,
  GetAdvisorParams,
  CreateAdvisorParams,
  DeleteAdvisorParams,
  PatchAdvisorParams,
  ListAdvisorsResponse,
} from 'requests';

export const listadvisors = (
  params?: ListAdvisorsParams,
): Promise<Response<ListAdvisorsResponse>> =>
  axiosGet('v1/users', { params });

export const getadvisor = ({
  id,
}:  GetAdvisorParams): Promise<Response<Iadvisor>> =>
  axiosGet(`v1/users/${id}`);

export const createadvisor = (
  data:  CreateAdvisorParams,
): Promise<Response<Iadvisor>> => axiosPost('v1/users/advisors', { data });

export const deleteadvisor = ({
  id,
}: DeleteAdvisorParams): Promise<Response<{}>> =>
  axiosDelete(`v1/users/${id}`);

export const patchadvisor = ({
  id,
  ...data
}: PatchAdvisorParams): Promise<Response<Iadvisor>> =>
  axiosPatch(`v1/users/advisors/${id}`, { data });
