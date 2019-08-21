import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  IQuestionJob,
  ListQuestionJobsParams,
  GetQuestionJobParams,
  CreateQuestionJobParams,
  DeleteQuestionJobParams,
  PatchQuestionJobparams,
  ListQuestionJobResponse
} from 'requests';

export const listQuestionJob = (
  params?: ListQuestionJobsParams
): Promise<Response<ListQuestionJobResponse>> =>
  axiosGet('v1/questionJobs', { params });

export const getQuestionJob = ({
  id
}: GetQuestionJobParams): Promise<Response<IQuestionJob>> =>
  axiosGet(`v1/questionJobs/${id}`);

export const createQuestionJob = (
  data: CreateQuestionJobParams
): Promise<Response<IQuestionJob>> => axiosPost('v1/questionJobs', { data });

export const deleteQuestionJob = ({
  id
}: DeleteQuestionJobParams): Promise<Response<{}>> =>
  axiosDelete(`v1/questionJobs/${id}`);

export const patchQuestionJob = ({
  id,
  ...data
}: PatchQuestionJobparams): Promise<Response<IQuestionJob>> =>
  axiosPatch(`v1/questionJobs/${id}`, { data });
