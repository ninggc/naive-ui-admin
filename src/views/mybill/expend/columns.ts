import { h } from 'vue';
import { NTag } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
import { Transaction } from '../entity';

export enum TransactionType {
  Expense = '支出',
  Income = '收入',
}

export interface ListData extends Transaction {}

export const columns: BasicColumn<ListData>[] = [
  {
    title: 'ID',
    key: 'id',
    width: 40, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '唯一ID',
    key: 'unique_id',
    width: 200, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '应用',
    key: 'app',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '交易时间',
    key: 'transaction_hour',
    width: 200, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '交易类型',
    key: 'transaction_type',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
    render(record) {
      return h(
        NTag,
        {
          type: record.transaction_type === TransactionType.Expense ? 'error' : 'success',
        },
        {
          default: () => record.transaction_type,
        }
      );
    },
  },
  {
    title: '交易对方',
    key: 'counterparty',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '对方账号',
    key: 'other_accounts',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '商品',
    key: 'commodity',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '收/支',
    key: 'income_expenditure',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '金额',
    key: 'amount',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '支付方式',
    key: 'payment_method',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '当前状态',
    key: 'current_state',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '交易单号',
    key: 'transaction_number',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '商户单号',
    key: 'merchant_tracking_number',
    width: 150, // 调整宽度
    filter: true, // 添加筛选框
  },
  {
    title: '备注',
    key: 'remark',
    width: 200, // 调整宽度
    filter: true, // 添加筛选框
  },
];
