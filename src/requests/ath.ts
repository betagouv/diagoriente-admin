import { axiosPost } from './http';
import { Response, listLoginParams } from 'requests';

export const Login = (params?: listLoginParams): Promise<Response<any>> =>
  axiosPost('/v1/auth/admin', { data: params, sendToken: false });
