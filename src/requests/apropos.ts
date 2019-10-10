import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  IApropos,
  Response,
  createApropos,
  ListAproposResponse,
  GetAproposParams,
} from 'requests';

export interface ListAproposParams {
  page?: number;
  perPage?: number;
  search?: string;
}
export const listApropos = (
  params: ListAproposParams,
): Promise<Response<ListAproposResponse>> => {
  return axiosGet(`v1/apropos`, { params });
};
export const CreateApropos = (
  data: createApropos,
): Promise<Response<IApropos>> => axiosPost('v1/apropos', { data });

export const getApropos = (id: any): Promise<Response<IApropos>> => {
  return axiosGet(`v1/apropos/${id}`);
};

export const patchApropos = ({
  id,
  ...data
}: Partial<any> & { id: string }): Promise<Response<IApropos>> => {
  return axiosPatch(`v1/apropos/${id}`, { ...data });
};

export const deleteApropos = ({
  id,
}: GetAproposParams): Promise<Response<{}>> => axiosDelete(`v1/apropos/${id}`);
