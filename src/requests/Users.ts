import { axiosGet, axiosDelete } from './http';
import {
  Response,
  IUser,
  listUsersParams,
  GetUserParams,
  DeleteUserParams,
} from 'requests';

export const listUsers = (
  params?: listUsersParams,
): Promise<Response<IUser[]>> => axiosGet('v1/users', { params });

export const getUser = ({ id }: GetUserParams): Promise<Response<IUser>> =>
  axiosGet(`v1/users/${id}`);

export const deleteUser = ({ id }: DeleteUserParams): Promise<Response<{}>> =>
  axiosDelete(`v1/users/${id}`);
