import { axiosGet, axiosDelete } from './http';
import {
  Response,
  IParcour,
  listParcoursParams,
  getParcoursParams,
  DeleteParcourParams,
} from 'requests';

export const listParcours = (
  params?: {page?: number,perPage?: number,search?: string, codeId: string}
): Promise<Response<IParcour[]>> => axiosGet('v1/parcours', { params });

export const getParcour = ({
  id,
}: getParcoursParams): Promise<Response<IParcour>> =>
  axiosGet(`v1/parcours/${id}`);

export const deleteParcour = ({ id }: DeleteParcourParams): Promise<Response<{}>> =>
  axiosDelete(`v1/parcours/${id}`);

  export const listParcoursSearch = (
    params: {codeId: string},
  ): Promise<Response<IParcour[]>> => axiosGet('v1/parcours', { params });