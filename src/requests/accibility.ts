import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import { Response, GetEnvironmentParams, DeleteEnvironmentParams, PatchEnvironmentparams } from 'requests';

export interface ListAccessibilityparams {
  _id: string;
  name: string;
}

export interface createAccessibilityParams {
  name: string;
}

export interface IAccessibility {
  _id: string;
  name: string;
}
type PatchAccessibilityparams = createAccessibilityParams & { id: string };

export type ListAccessibilityResponse = { _id: string; name: string }[];
export const listAccessibility = (params?: ListAccessibilityparams): Promise<Response<ListAccessibilityResponse>> => axiosGet('v1/accessibility');

export const getAccessibility = ({ id }: GetEnvironmentParams): Promise<Response<IAccessibility>> => axiosGet(`v1/accessibility/${id}`);

export const createAccessibility = (data: createAccessibilityParams): Promise<Response<IAccessibility>> => axiosPost('v1/accessibility ', { data });

export const deleteAccessibility = ({ id }: DeleteEnvironmentParams): Promise<Response<{}>> => axiosDelete(`v1/accessibility/${id}`, { data: id });

export const patchAccessibility = ({ id, ...data }: PatchAccessibilityparams): Promise<Response<IAccessibility>> =>
  axiosPatch(`v1/accessibility/${id}`, { data });
