import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  ICompetence,
  ListCompetencesParams,
  GetCompetenceParams,
  CreateComptenceParams,
  DeleteCompetenceParams,
  patchCompetenceParams,
  ListCompetencesResponse,
} from 'requests';

export const listCompetences = (
  params?: ListCompetencesParams,
): Promise<Response<ListCompetencesResponse>> =>
  axiosGet('v1/competences', { params });

export const GetCompetence = ({
  id,
}: GetCompetenceParams): Promise<Response<ICompetence>> =>
  axiosGet(`v1/competences/${id}`);

export const createCompetence = (
  data: CreateComptenceParams,
): Promise<Response<ICompetence>> => axiosPost('v1/competences', { data });

export const deleteCompetence = ({
  id,
}: DeleteCompetenceParams): Promise<Response<{}>> =>
  axiosDelete(`v1/competences/${id}`);

export const patchCompetence = ({
  id,
  ...data
}: patchCompetenceParams): Promise<Response<ICompetence>> =>
  axiosPatch(`v1/competences/${id}`, { data });
