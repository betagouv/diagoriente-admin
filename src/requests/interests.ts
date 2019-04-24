import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  Interest,
  ListInterestsParams,
  GetInterestParams,
  CreateInterestParams,
  DeleteInterestParams,
  PatchInterestParams,
  ListInterestResponse,
} from 'requests';

export const listInterests = (
  params?: ListInterestsParams,
): Promise<Response<ListInterestResponse>> =>
  axiosGet('v1/interests', { params });

export const getInterest = ({
  id,
}: GetInterestParams): Promise<Response<Interest>> =>
  axiosGet(`v1/interests/${id}`);

export const createInterest = (
  data: CreateInterestParams,
): Promise<Response<Interest>> => axiosPost('v1/interests', { data });

export const deleteInterest = ({
  id,
}: DeleteInterestParams): Promise<Response<{}>> =>
  axiosDelete(`v1/interests/${id}`);

export const patchInterest = ({
  id,
  ...data
}: PatchInterestParams): Promise<Response<Interest>> =>
  axiosPatch(`v1/interests/${id}`, { data });
