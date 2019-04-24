import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  Activity,
  ListActivitiesParams,
  GetActivityParams,
  CreateActivityParams,
  DeleteActivityParams,
  PatchActivityParams,
  ListActivitiesResponse,
} from 'requests';

export const listActivities = (
  params?: ListActivitiesParams,
): Promise<Response<ListActivitiesResponse>> =>
  axiosGet('v1/activities', { params });

export const getActivity = ({
  id,
}: GetActivityParams): Promise<Response<Activity>> =>
  axiosGet(`v1/activities/${id}`);

export const createActivity = (
  data: CreateActivityParams,
): Promise<Response<Activity>> => axiosPost('v1/activities', { data });

export const deleteActivity = ({
  id,
}: DeleteActivityParams): Promise<Response<{}>> =>
  axiosDelete(`v1/activities/${id}`);

export const patchActivity = ({
  id,
  ...data
}: PatchActivityParams): Promise<Response<Activity>> =>
  axiosPatch(`v1/activities/${id}`, { data });
