<template>
    <n-card :bordered="false">
      <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
        <template #statusSlot="{ model, field }">
          <n-input v-model:value="model[field]" />
        </template>
      </BasicForm>
    </n-card>
    <n-card :bordered="false" class="mt-3">
      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row:ListData) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        @update:checked-row-keys="onCheckedRow"
        :scroll-x="1500"
        :striped="true"
      >
        <template #tableTitle>
          <n-button type="primary" @click="addTable">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon>
            </template>
            新建
          </n-button>
        </template>
  
        <template #toolbar> </template>
      </BasicTable>
  
      <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
        <n-form
          :model="formParams"
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="80"
          class="py-4"
        >
          <n-form-item label="唯一ID" path="uniqueId">
            <n-input placeholder="请输入唯一ID" v-model:value="formParams.uniqueId" />
          </n-form-item>
          <n-form-item label="应用" path="app">
            <n-input placeholder="请输入应用" v-model:value="formParams.app" />
          </n-form-item>
          <n-form-item label="交易时间" path="transactionHour">
            <n-input placeholder="请输入交易时间" v-model:value="formParams.transactionHour" />
          </n-form-item>
          <n-form-item label="交易类型" path="transactionType">
            <n-input placeholder="请输入交易类型" v-model:value="formParams.transactionType" />
          </n-form-item>
          <n-form-item label="交易对方" path="counterparty">
            <n-input placeholder="请输入交易对方" v-model:value="formParams.counterparty" />
          </n-form-item>
          <n-form-item label="对方账号" path="otherAccounts">
            <n-input placeholder="请输入对方账号" v-model:value="formParams.otherAccounts" />
          </n-form-item>
          <n-form-item label="商品" path="commodity">
            <n-input placeholder="请输入商品" v-model:value="formParams.commodity" />
          </n-form-item>
          <n-form-item label="收/支" path="incomeExpenditure">
            <n-input placeholder="请输入收/支" v-model:value="formParams.incomeExpenditure" />
          </n-form-item>
          <n-form-item label="金额" path="amount">
            <n-input-number placeholder="请输入金额" v-model:value="formParams.amount" />
          </n-form-item>
          <n-form-item label="支付方式" path="paymentMethod">
            <n-input placeholder="请输入支付方式" v-model:value="formParams.paymentMethod" />
          </n-form-item>
          <n-form-item label="当前状态" path="currentState">
            <n-input placeholder="请输入当前状态" v-model:value="formParams.currentState" />
          </n-form-item>
          <n-form-item label="交易单号" path="transactionNumber">
            <n-input placeholder="请输入交易单号" v-model:value="formParams.transactionNumber" />
          </n-form-item>
          <n-form-item label="商户单号" path="merchantTrackingNumber">
            <n-input placeholder="请输入商户单号" v-model:value="formParams.merchantTrackingNumber" />
          </n-form-item>
          <n-form-item label="备注" path="remark">
            <n-input type="textarea" placeholder="请输入备注" v-model:value="formParams.remark" />
          </n-form-item>
        </n-form>
  
        <template #action>
          <n-space>
            <n-button @click="() => (showModal = false)">取消</n-button>
            <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </template>
  
  <script lang="ts" setup>
    import { h, reactive, ref } from 'vue';
    import { BasicTable, TableAction } from '@/components/Table';
    import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
    import { getTableList } from '@/api/mybill/list';
    import { columns, ListData } from './columns';
    import { PlusOutlined } from '@vicons/antd';
    import { useRouter } from 'vue-router';
    import { type FormRules } from 'naive-ui';
    import { TransactionType } from './columns';
  
    const transactionTypeOptions = [
      { label: '支出', value: TransactionType.Expense },
      { label: '收入', value: TransactionType.Income },
    ];
  
    const rules: FormRules = {
      uniqueId: { required: true, message: '请输入唯一ID', trigger: ['blur', 'input'] },
      app: { required: true, message: '请输入应用', trigger: ['blur', 'input'] },
      transactionHour: { required: true, message: '请输入交易时间', trigger: ['blur', 'input'] },
      transactionType: { required: true, message: '请输入交易类型', trigger: ['blur', 'input'] },
      counterparty: { required: true, message: '请输入交易对方', trigger: ['blur', 'input'] },
      otherAccounts: { message: '请输入对方账号', trigger: ['blur', 'input'] },
      commodity: { message: '请输入商品', trigger: ['blur', 'input'] },
      incomeExpenditure: { required: true, message: '请输入收/支', trigger: ['blur', 'input'] },
      amount: { type: 'number', required: true, message: '请输入金额', trigger: ['blur', 'input'] },
      paymentMethod: { message: '请输入支付方式', trigger: ['blur', 'input'] },
      currentState: { message: '请输入当前状态', trigger: ['blur', 'input'] },
      transactionNumber: { message: '请输入交易单号', trigger: ['blur', 'input'] },
      merchantTrackingNumber: { message: '请输入商户单号', trigger: ['blur', 'input'] },
      remark: { message: '请输入备注', trigger: ['blur', 'input'] },
    };
  
    const schemas: FormSchema[] = [
    ];
  
    const router = useRouter();
    const formRef: any = ref(null);
    const actionRef = ref();
  
    const showModal = ref(false);
    const formBtnLoading = ref(false);
    const formParams = reactive({
      uniqueId: '',
      app: '',
      transactionHour: '',
      transactionType: '',
      counterparty: '',
      otherAccounts: '',
      commodity: '',
      incomeExpenditure: '',
      amount: null,
      paymentMethod: '',
      currentState: '',
      transactionNumber: '',
      merchantTrackingNumber: '',
      remark: '',
    });
  
    const actionColumn = reactive({
      width: 220,
      title: '操作',
      key: 'action',
      fixed: 'right',
      render(record) {
        return h(TableAction as any, {
          style: 'button',
          actions: [
            {
              label: '删除',
              onClick: handleDelete.bind(null, record),
              // 根据业务控制是否显示 isShow 和 auth 是并且关系
              ifShow: () => {
                return true;
              },
              // 根据权限控制是否显示: 有权限，会显示，支持多个
              auth: ['basic_list'],
            },
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: () => {
                return true;
              },
              auth: ['basic_list'],
            },
          ],
          dropDownActions: [
            {
              label: '启用',
              key: 'enabled',
              // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              ifShow: () => {
                return true;
              },
            },
            {
              label: '禁用',
              key: 'disabled',
              ifShow: () => {
                return true;
              },
            },
          ],
          select: (key) => {
            window['$message'].info(`您点击了，${key} 按钮`);
          },
        });
      },
    });
  
    const [register, { getFieldsValue }] = useForm({
      gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
      labelWidth: 80,
      schemas,
    });
  
    function addTable() {
      showModal.value = true;
    }
  
    const loadDataTable = async (res) => {
      return await getTableList({ ...getFieldsValue(), ...res });
    };
  
    function onCheckedRow(rowKeys) {
      console.log(rowKeys);
    }
  
    function reloadTable() {
      actionRef.value.reload();
    }
  
    function confirmForm(e) {
      e.preventDefault();
      formBtnLoading.value = true;
      formRef.value.validate((errors) => {
        if (!errors) {
          window['$message'].success('新建成功');
          setTimeout(() => {
            showModal.value = false;
            reloadTable();
          });
        } else {
          window['$message'].error('请填写完整信息');
        }
        formBtnLoading.value = false;
      });
    }
  
    function handleEdit(record: Recordable) {
      console.log('点击了编辑', record);
      router.push({ name: 'basic-info', params: { id: record.id } });
    }
  
    function handleDelete(record: Recordable) {
      console.log('点击了删除', record);
      window['$message'].info('点击了删除');
    }
  
    function handleSubmit(values: Recordable) {
      console.log(values);
      reloadTable();
    }
  
    function handleReset(values: Recordable) {
      console.log(values);
    }
  </script>
  
  <style lang="less" scoped></style>
