import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

// const apiUrl = 'http://172.17.0.1:8888/'
// const wsUrl = 'http://localhost:8889/chat'

// const apiUrl = 'http://localhost:4000/'
const wsUrl = 'ws://localhost/ws/chat'

export { wsUrl };

const apiClient: AxiosInstance = createAxios();

function createAxios(): AxiosInstance {
  let token = localStorage.getItem('Authorization');
  let config: AxiosRequestConfig<any> = {
    // baseURL: apiUrl,
    headers: {
      "Content-type": "application/json",
      'Authorization': token === null || token === '' ? '' : token,
    },
  }
  return axios.create(config)
}

export default apiClient;

export class HttpResp {
  code: number;
  msg: string;
  data: any;

  constructor(code: number, msg: string) {
    this.code = code;
    this.msg = msg;
  }
}

function handlerGetParams(params: Map<string, any>): string {
  let str = "?"
  params.forEach((k, v) => {
    str += `{k}={v}&`
  });
  return str
}