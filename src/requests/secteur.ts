import {
  axiosGet,
  axiosPost,
  axiosDelete,
  axiosPatch,
  axiosPostFilesData,
} from './http';
import {
  Response,
  ISecteur,
  ListSecteursParams,
  GetSecteurParams,
  CreateSecteurParams,
  DeleteSecteurParams,
  PatchSecteurParams,
  ListSecteursResponse,
  ListResponse,
} from 'requests';

export const listSecteurs = (
  params?: ListSecteursParams,
): Promise<Response<ListSecteursResponse>> => {
  return axiosGet('v1/themes/', { params });
};
export const getListSecteurs = (
  params?: ListSecteursParams,
): Promise<Response<ListResponse<{ _id: string; title: string; }>>> => {
  return axiosGet('v1/themes/', { params });
};

export const getSecteur = ({
  id,
}: GetSecteurParams): Promise<Response<ISecteur>> =>
  axiosGet(`v1/themes/secteur/${id}`);

/* export const getSecteurThemes = ({
  id,
}: GetSecteurParams): Promise<Response<ISecteur>> =>
  axiosGet(`v1/themes/secteur${id}`); */

export const createSecteur = (
  data: CreateSecteurParams,
): Promise<Response<ISecteur>> => axiosPost('v1/themes/secteur', { data });

export const deleteSecteur = ({
  id,
}: DeleteSecteurParams): Promise<Response<{}>> =>
  axiosDelete(`v1/themes/secteur/${id}`);

export const patchSecteur = ({
  id,
  ...data
}: PatchSecteurParams): Promise<Response<ISecteur>> =>
  axiosPatch(`v1/themes/secteur/${id}`, { data });

export const updateFile = (id: string, data: any): Promise<Response<{}>> =>
  axiosPostFilesData(`v1/themes/media/${id}`, { data });
