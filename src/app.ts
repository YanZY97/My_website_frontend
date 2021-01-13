import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 10000,
  // headers: {
  //   'Authorization': 'Bearer ' + (localStorage.getItem('access') || sessionStorage.getItem('access'))
  // }
};
