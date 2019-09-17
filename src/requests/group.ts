import { axiosGet, axiosPost, axiosDelete, axiosPatch } from "./http";
import {
  ListParams,
  ListResponse,
  IGroup,
  Response,
  createGroup,
  ListGroupResponse
} from "requests";

export const listgroup = (
  advisorId: any, page?: number, perPage?: number,
  search?: string
): Promise<Response<ListGroupResponse>> => {
  return axiosGet(`v1/groupe/advisor/${advisorId.advisorId}`);
};
export const createGroupCall = (data: createGroup): Promise<Response<IGroup>> =>
  axiosPost("v1/groupe", { data });
export const getGroup = (id: any): Promise<Response<IGroup>> => {
  return axiosGet(`v1/groupe/groupeId/${id.id}`);
};

export const patchGroup = ({
  id,
  ...data
}: Partial<createGroup> & { id: string }): Promise<Response<IGroup>> =>
  axiosPatch(`v1/groupe/groupeId/${id}`, { data });
