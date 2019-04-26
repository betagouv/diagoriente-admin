import { axiosGet, axiosPost, axiosDelete, axiosPatch } from './http';
import {
  Response,
  Rank,
  ListRanksParams,
  CreateRankParams,
  ListRanksResponse,
} from 'requests';

export const listRanks = (): Promise<Response<any>> =>
  axiosGet('v1/familiesRank');

export const createRank = (
  data: CreateRankParams,
): Promise<Response<Rank>> => axiosPost('v1/familiesRank', { data });
