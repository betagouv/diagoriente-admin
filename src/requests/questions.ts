import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  Question,
  ListQuestionsParams,
  GetQuestionParams,
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  ListQuestionResponse,
} from 'requests';

export const listQuestions = (
  params?: ListQuestionsParams,
): Promise<Response<ListQuestionResponse>> =>
  axiosGet('v1/questions', { params });

export const getQuestion = ({
  id,
}: GetQuestionParams): Promise<Response<Question>> =>
  axiosGet(`v1/questions/${id}`);

export const createQuestion = (
  data: CreateQuestionParams,
): Promise<Response<Question>> => axiosPost('v1/questions', { data });

export const deleteQuestion = ({
  id,
}: DeleteQuestionParams): Promise<Response<{}>> =>
  axiosDelete(`v1/questions/${id}`);

export const editQuestion = ({
  id,
  ...data
}: EditQuestionParams): Promise<Response<Question>> =>
  axiosPost(`v1/questions/${id}`, { data });
