<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="上传账单"> 上传账单文件 </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <n-grid cols="2 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
        <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
          <n-form
            :label-width="120"
            :model="formValue"
            :rules="rules"
            label-placement="left"
            ref="formRef"
            class="py-8"
          >
            <n-form-item label="WX账单文件" path="file">
              <BasicSelect
                :default-upload="false"
                :headers="uploadHeaders"
                :data="{ type: 0 }"
                name="files"
                :width="100"
                :height="100"
                @upload-change="uploadChange"
                v-model:value="formValue.files"
                helpText="单个文件不超过2MB，最多只能上传10个文件"
              />
            </n-form-item>
            <div style="margin-left: 80px">
              <n-space>
                <n-button type="primary" @click="formSubmit">导入</n-button>
                <n-button @click="resetForm">重置</n-button>
              </n-space>
            </div>
          </n-form>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, reactive } from 'vue';
  import { useMessage } from 'naive-ui';
  import { BasicSelect } from '@/components/Select';
  import { useGlobSetting } from '@/hooks/setting';
  import { uploadFile } from '@/api/mybill/list';

  const globSetting = useGlobSetting();

  const rules = {
    remark: {
      required: false,
      message: '请输入预约备注',
      trigger: 'blur',
    },
    // images: {
    //   required: false,
    //   type: 'array',
    //   message: '请上传病例图片',
    //   trigger: 'change',
    // },
  };

  const formRef: any = ref(null);
  const message = useMessage();
  const { uploadUrl } = globSetting;

  const formValue = reactive({
    //图片列表 通常查看和编辑使用 绝对路径 | 相对路径都可以
    images: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'],
    files: [],
  });

  const uploadHeaders = reactive({
    platform: 'miniPrograms',
    timestamp: new Date().getTime(),
    token: 'Q6fFCuhc1vkKn5JNFWaCLf6gRAc5n0LQHd08dSnG4qo=',
  });

  function formSubmit() {
    formRef.value.validate((errors) => {
      if (!errors) {
        console.log('formValue', formValue);
        const files = formValue.files.map(fileInfo => fileInfo.file);
        if (files.length > 0) {
          uploadFile(files).then(response => {
            console.log('Files uploaded successfully:', response);
            message.success(`成功上传了 ${files.length} 个文件`);
          }).catch(error => {
            console.error('File upload failed:', error);
          });
        }
      } else {
        message.error('请检查表单填写是否正确');
      }
    });
  }

  function resetForm() {
    formRef.value.resetFields();
    formValue.files = [];
  }

  function uploadChange(list: UploadFileInfo[]) {
    formValue.files = list;
  }
</script>
