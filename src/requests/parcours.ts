import { axiosGet, axiosDelete } from './http';
import {
  Response,
  IParcour,
  listParcoursParams,
  getParcoursParams,
  DeleteParcourParams,
} from 'requests';

export const listParcours = (
  params?: listParcoursParams,
): Promise<Response<IParcour[]>> => axiosGet('v1/parcours', { params });

export const getParcour = ({
  id,
}: getParcoursParams): Promise<Response<IParcour>> =>
  axiosGet(`v1/parcours/${id}`);

export const deleteParcour = ({ id }: DeleteParcourParams): Promise<Response<{}>> =>
  axiosDelete(`v1/parcours/${id}`);
