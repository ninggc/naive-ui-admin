import axiosInstance from '@/utils/http/axios/index';

//获取table
export function getTableList(params) {
  return axiosInstance.get('/api/api-bill/list', { params })
    .then(data => {
      // 处理返回的数据
      console.log('getTableList');
      console.log(data);
      return data;
    });
}

// 上传文件
export function uploadFile(files: File[]) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  return axiosInstance.post('/api/api-bill/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(data => {
    // 处理返回的数据
    console.log('uploadFile');
    console.log(data);
    return data;
  });
}
