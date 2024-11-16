<template>
  <n-upload
    ref="upload"
    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    @change="handleChange"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { UploadFileInfo, UploadInst } from 'naive-ui'

export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => []
    },
    action: {
      type: String,
      default: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:value', 'upload-change'],
  setup(props, { emit }) {
    const fileListLengthRef = ref(0)
    const uploadRef = ref<UploadInst | null>(null)
    const fileListRef = ref<UploadFileInfo[]>([])

    watch(fileListRef, (newVal) => {

      emit('update:value', newVal.length)
      emit('upload-change',  newVal )
    })

    return {
      upload: uploadRef,
      fileListLength: fileListLengthRef,
      fileList: fileListRef,
      handleChange(options: { fileList: UploadFileInfo[] }) {

        fileListLengthRef.value = options.fileList.length
        fileListRef.value = options.fileList
      },
      handleClick() {
        uploadRef.value?.submit()
      }
    }
  }
})
</script>