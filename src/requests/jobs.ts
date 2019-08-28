import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  ListParams,
  ListResponse,
  Job,
  CreateJobData,
  getParcoursParams
} from 'requests';

export const listJobs = (
  params: ListParams
): Promise<Response<ListResponse<Job>>> => axiosGet('v1/jobs', { params });

export const createJob = (data: CreateJobData): Promise<Response<Job>> =>
  axiosPost('v1/jobs', { data });

export const getJob = (id: string): Promise<Response<Job>> =>
  axiosGet(`v1/jobs/${id}`);

export const deleteJob = (id: string): Promise<Response<void>> =>
  axiosDelete(`v1/jobs/${id}`);

export const patchJob = ({
  id,
  ...data
}: CreateJobData & { id: string }): Promise<Response<Job>> =>
  axiosPatch(`v1/jobs/${id}`, { data });

export const getMyJob = (
  parcourId: getParcoursParams,
  algoType: string
): Promise<Response<Job>> =>
  axiosGet(`v1/jobs/myJobs?parcourId=${parcourId}&algoType=${algoType}`);
