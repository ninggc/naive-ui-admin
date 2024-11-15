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
        :scroll-x="1090"
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
          <n-form-item label="交易类型" path="transactionType">
            <n-select v-model:value="formParams.transactionType" :options="transactionTypeOptions" />
          </n-form-item>
          <n-form-item label="日期" path="date">
            <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formParams.date" />
          </n-form-item>
          <n-form-item label="分类" path="category">
            <n-input placeholder="请输入分类" v-model:value="formParams.category" />
          </n-form-item>
          <n-form-item label="子分类" path="subCategory">
            <n-input placeholder="请输入子分类" v-model:value="formParams.subCategory" />
          </n-form-item>
          <n-form-item label="账户" path="account">
            <n-input placeholder="请输入账户" v-model:value="formParams.account" />
          </n-form-item>
          <n-form-item label="账户币种" path="currency">
            <n-input placeholder="请输入账户币种" v-model:value="formParams.currency" />
          </n-form-item>
          <n-form-item label="金额" path="amount">
            <n-input-number placeholder="请输入金额" v-model:value="formParams.amount" />
          </n-form-item>
          <n-form-item label="成员" path="member">
            <n-input placeholder="请输入成员" v-model:value="formParams.member" />
          </n-form-item>
          <n-form-item label="商家" path="merchant">
            <n-input placeholder="请输入商家" v-model:value="formParams.merchant" />
          </n-form-item>
          <n-form-item label="项目分类" path="projectCategory">
            <n-input placeholder="请输入项目分类" v-model:value="formParams.projectCategory" />
          </n-form-item>
          <n-form-item label="项目" path="project">
            <n-input placeholder="请输入项目" v-model:value="formParams.project" />
          </n-form-item>
          <n-form-item label="记账人" path="bookkeeper">
            <n-input placeholder="请输入记账人" v-model:value="formParams.bookkeeper" />
          </n-form-item>
          <n-form-item label="备注" path="notes">
            <n-input type="textarea" placeholder="请输入备注" v-model:value="formParams.notes" />
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
      transactionType: { required: true, message: '请选择交易类型', trigger: ['blur', 'change'] },
      date: { type: 'date', required: true, message: '请选择日期', trigger: ['blur', 'change'] },
      category: { required: true, message: '请输入分类', trigger: ['blur', 'input'] },
      subCategory: { required: true, message: '请输入子分类', trigger: ['blur', 'input'] },
      account: { required: true, message: '请输入账户', trigger: ['blur', 'input'] },
      currency: { required: true, message: '请输入账户币种', trigger: ['blur', 'input'] },
      amount: { type: 'number', required: true, message: '请输入金额', trigger: ['blur', 'input'] },
      member: { required: true, message: '请输入成员', trigger: ['blur', 'input'] },
      merchant: { required: true, message: '请输入商家', trigger: ['blur', 'input'] },
      projectCategory: { required: true, message: '请输入项目分类', trigger: ['blur', 'input'] },
      project: { required: true, message: '请输入项目', trigger: ['blur', 'input'] },
      bookkeeper: { required: true, message: '请输入记账人', trigger: ['blur', 'input'] },
      notes: { required: true, message: '请输入备注', trigger: ['blur', 'input'] },
    };
  
    const schemas: FormSchema[] = [
      {
        field: 'name',
        labelMessage: '这是一个提示',
        component: 'NInput',
        label: '姓名',
        componentProps: {
          placeholder: '请输入姓名',
          onInput: (e: any) => {
            console.log(e);
          },
        },
        rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
      },
      {
        field: 'mobile',
        component: 'NInputNumber',
        label: '手机',
        componentProps: {
          placeholder: '请输入手机号码',
          showButton: false,
          onInput: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: 'type',
        component: 'NSelect',
        label: '类型',
        componentProps: {
          placeholder: '请选择类型',
          options: [
            {
              label: '舒适性',
              value: 1,
            },
            {
              label: '经济性',
              value: 2,
            },
          ],
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: 'makeDate',
        component: 'NDatePicker',
        label: '预约时间',
        defaultValue: 1183135260000,
        componentProps: {
          type: 'date',
          clearable: true,
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: 'makeTime',
        component: 'NTimePicker',
        label: '停留时间',
        componentProps: {
          clearable: true,
          onUpdateValue: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: 'status',
        label: '状态',
        //插槽
        slot: 'statusSlot',
      },
      {
        field: 'makeProject',
        component: 'NCheckbox',
        label: '预约项目',
        componentProps: {
          placeholder: '请选择预约项目',
          options: [
            {
              label: '种牙',
              value: 1,
            },
            {
              label: '补牙',
              value: 2,
            },
            {
              label: '根管',
              value: 3,
            },
          ],
          onUpdateChecked: (e: any) => {
            console.log(e);
          },
        },
      },
      {
        field: 'makeSource',
        component: 'NRadioGroup',
        label: '来源',
        componentProps: {
          options: [
            {
              label: '网上',
              value: 1,
            },
            {
              label: '门店',
              value: 2,
            },
          ],
          onUpdateChecked: (e: any) => {
            console.log(e);
          },
        },
      },
    ];
  
    const router = useRouter();
    const formRef: any = ref(null);
    const actionRef = ref();
  
    const showModal = ref(false);
    const formBtnLoading = ref(false);
    const formParams = reactive({
      transactionType: null,
      date: null,
      category: '',
      subCategory: '',
      account: '',
      currency: '',
      amount: null,
      member: '',
      merchant: '',
      projectCategory: '',
      project: '',
      bookkeeper: '',
      notes: '',
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
