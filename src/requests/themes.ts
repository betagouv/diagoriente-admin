import {
  axiosGet,
  axiosPost,
  axiosDelete,
  axiosPatch,
  axiosPostFilesData,
} from './http';
import {
  Response,
  Theme,
  ListThemesParams,
  GetThemeParams,
  CreateThemeParams,
  DeleteThemeParams,
  PatchThemeParams,
  ListThemesResponse,
} from 'requests';

export const listThemes = (
  params?: ListThemesParams,
): Promise<Response<ListThemesResponse>> => {
  return axiosGet('v1/themes/all', { params });
};

export const getTheme = ({ id }: GetThemeParams): Promise<Response<Theme>> =>
  axiosGet(`v1/themes/${id}`);

export const createTheme = (
  data: CreateThemeParams,
): Promise<Response<Theme>> => axiosPost('v1/themes', { data });

export const deleteTheme = ({ id }: DeleteThemeParams): Promise<Response<{}>> =>
  axiosDelete(`v1/themes/${id}`);

export const patchTheme = ({
  id,
  ...data
}: PatchThemeParams): Promise<Response<Theme>> =>
  axiosPatch(`v1/themes/${id}`, { data });

export const updateFileData = (
  id: string,
  data
 : any): Promise<Response<{}>> =>
  axiosPostFilesData(`v1/themes/media/${id}`, { data });
