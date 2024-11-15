import { Alova } from '@/utils/http/alova/index';

//获取table
export function getTableList(params) {
  return Alova.Get('/api/api-bill/list', { params });
}
