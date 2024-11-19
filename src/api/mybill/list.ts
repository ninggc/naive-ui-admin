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

// 导出账单
export function exportBills() {
  return axiosInstance.get('/api/api-bill/export', {
    responseType: 'blob'
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bills.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}

// 同步账单到飞书
export function syncBills() {
  return axiosInstance.post('/api/api-bill/sync')
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Sync error:', error);
      throw error;
    });
}
