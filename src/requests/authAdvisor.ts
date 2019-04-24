import { axiosPost } from './http';
import { Response, listLoginParams } from 'requests';

export const LoginAdvisor = (params?: listLoginParams): Promise<Response<any>> =>
  axiosPost('v1/auth/advisor', { data: params, sendToken: false });
