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
  },
  {
    title: '交易类型',
    key: 'transaction_type',
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
    title: '日期',
    key: 'date',
  },
  {
    title: '分类',
    key: 'category',
  },
  {
    title: '子分类',
    key: 'sub_category',
  },
  {
    title: '账户',
    key: 'account',
  },
  {
    title: '账户币种',
    key: 'currency',
  },
  {
    title: '金额',
    key: 'amount',
  },
  {
    title: '成员',
    key: 'member',
  },
  {
    title: '商家',
    key: 'merchant',
  },
  {
    title: '项目分类',
    key: 'project_category',
  },
  {
    title: '项目',
    key: 'project',
  },
  {
    title: '记账人',
    key: 'bookkeeper',
  },
  {
    title: '备注',
    key: 'notes',
  },
  {
    title: '版本',
    key: 'version',
  },
];
