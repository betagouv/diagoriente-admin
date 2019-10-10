import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  IPage,
  Response,
  createPage,
  ListPageResponse,
  GetPageParams,
} from 'requests';

export interface ListPageParams {
  page?: number;
  perPage?: number;
  search?: string;
}
export const listPage = (
  params: ListPageParams,
): Promise<Response<ListPageResponse>> => {
  return axiosGet(`v1/page`, { params });
};
export const CreatePage = (data: createPage): Promise<Response<IPage>> =>
  axiosPost('v1/page', { data });

export const getPage = (id: any): Promise<Response<IPage>> => {
  return axiosGet(`v1/page/${id}`);
};

export const patchPage = ({
  id,
  ...data
}: Partial<any> & { id: string }): Promise<Response<IPage>> => {
  return axiosPatch(`v1/page/${id}`, { ...data });
};

export const deletePage = ({ id }: GetPageParams): Promise<Response<{}>> =>
  axiosDelete(`v1/page/${id}`);
