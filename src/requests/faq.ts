import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  IFaq,
  Response,
  createFaq,
  ListFaqResponse,
  GetFaqParams,
  createFaqParams,
} from 'requests';

export interface ListFaqParams {
  page?: number;
  perPage?: number;
  search?: string;
  advisorId?: any;
}
export const listFaq = (
  params: ListFaqParams,
): Promise<Response<ListFaqResponse>> => {
  return axiosGet(`v1/faq`, { params });
};
export const CreateFaq = (data: createFaq): Promise<Response<IFaq>> =>
  axiosPost('v1/faq', { data });

export const getFaq = (id: any): Promise<Response<IFaq>> => {
  return axiosGet(`v1/faq/${id}`);
};

export const patchFaq = ({
  id,
  ...data
}: Partial<any> & { id: string }): Promise<Response<IFaq>> => {
  return axiosPatch(`v1/faq/${id}`, { ...data });
};

export const deleteFaq = ({ id }: GetFaqParams): Promise<Response<{}>> =>
  axiosDelete(`v1/faq/${id}`);
