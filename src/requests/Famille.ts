import {
  axiosGet,
  axiosPost,
  axiosDelete,
  axiosPatch,
  axiosPostFilesData
} from './http';
import {
  Response,
  Famille,
  ListFamillesParams,
  GetFamilleParams,
  CreateFamilleParams,
  DeleteFamilleParams,
  PatchFamilleParams,
  ListFamillesResponse,
  DeletePhotoParams
} from 'requests';

export const listFamilles = (
  params?: ListFamillesParams
): Promise<Response<ListFamillesResponse>> =>
  axiosGet('v1/families/admin', { params });

export const getFamille = ({
  id
}: GetFamilleParams): Promise<Response<Famille>> =>
  axiosGet(`v1/families/${id}`);

export const createFamille = (
  data: CreateFamilleParams
): Promise<Response<Famille>> => axiosPost('v1/families', { data });

export const deleteFamille = ({
  id
}: DeleteFamilleParams): Promise<Response<{}>> =>
  axiosDelete(`v1/families/${id}`);

export const patchFamille = ({
  id,
  ...data
}: PatchFamilleParams): Promise<Response<Famille>> =>
  axiosPatch(`v1/families/${id}`, { data });

export const uploadPhotos = (id: string, data: any): Promise<Response<{}>> =>
  axiosPostFilesData(`v1/families/addUploads/${id}`, { data });

export const deleteFamillePhoto = ({
  id,
  ...data
}: DeletePhotoParams): Promise<Response<Famille>> =>
  axiosPost(`v1/families/removeUploads/${id}`, { data });
