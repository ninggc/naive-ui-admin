import { Alova } from '@/utils/http/alova/index';

//获取table
export function getTableList(params) {
  let res = Alova.Get('/table/list', { params });
  res.then(data => {
    console.log('getTableList');
    console.log(data);
  })
  return res
}
