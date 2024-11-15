import { Alova } from '@/utils/http/alova/index';

//获取table
export function getTableList(params) {
  debugger
  let prefix = 'http://localhost:8000';

  return Alova.Get(prefix + '/api/api-bill/list', { params });
}
