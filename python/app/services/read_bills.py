import csv
"""
This script reads WeChat bills from a CSV file and prints each bill.

Functions:
    read_wechat_bills(file_path: str) -> list[dict[str, str]]:
        Reads WeChat bills from the specified CSV file and returns a list of dictionaries representing each bill.

Usage:
    Run this script from the command line with the path to the WeChat bills CSV file as an argument.
    Example:
        python read-bills.py /path/to/wechat_bills.csv

Args:
    file_path (str): The path to the WeChat bills CSV file.

Returns:
    list[dict[str, str]]: A list of dictionaries where each dictionary represents a bill with key-value pairs corresponding to the CSV columns.
"""
import argparse

def read_wechat_bills(file_path):
    bills = []
    with open(file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            bills.append(row)
    return bills

class Bill:
    def __init__(self, app, transaction_hour, transaction_type, counterparty, other_accounts, commodity, income_expenditure, amount, payment_method, current_state, transaction_number, merchant_tracking_number, remark):
        self.app = app  # App
        self.transaction_hour = transaction_hour  # AliPay/WeChat 交易时间
        self.transaction_type = transaction_type  # AliPay/WeChat 交易类型
        self.counterparty = counterparty  # AliPay/WeChat 交易对方
        self.other_accounts = other_accounts  # AliPay 对方账号
        self.commodity = commodity  # AliPay/WeChat 商品
        self.income_expenditure = income_expenditure  # AliPay/WeChat 收/支
        self.amount = amount  # AliPay/WeChat 金额
        self.payment_method = payment_method  # AliPay/WeChat 支付方式
        self.current_state = current_state  # AliPay/WeChat 当前状态
        self.transaction_number = transaction_number  # AliPay/WeChat 交易单号
        self.merchant_tracking_number = merchant_tracking_number  # AliPay/WeChat 商户单号
        self.remark = remark  # WeChat 备注

    def __repr__(self):
        return f"Bill(app={self.app}, transaction_hour={self.transaction_hour}, transaction_type={self.transaction_type}, counterparty={self.counterparty}, other_accounts={self.other_accounts}, commodity={self.commodity}, income_expenditure={self.income_expenditure}, amount={self.amount}, payment_method={self.payment_method}, current_state={self.current_state}, transaction_number={self.transaction_number}, merchant_tracking_number={self.merchant_tracking_number}, remark={self.remark})"

def parse_wechat_bills(bills):
    parsed_bills = []
    for bill in bills:
        parsed_bill = Bill(
            app='WeChat',
            transaction_hour=bill['交易时间'],
            transaction_type=bill['交易类型'],
            counterparty=bill['交易对方'],
            other_accounts='',
            commodity=bill['商品'],
            income_expenditure='',
            amount=bill['金额(元)'],
            payment_method='',
            current_state=bill['当前状态'],
            transaction_number='',
            merchant_tracking_number='',
            remark=bill['备注'] if '备注' in bill else ''
        )
        parsed_bills.append(parsed_bill)
    return parsed_bills

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Read WeChat bills from a CSV file.')
    parser.add_argument('file_path', type=str, help='The path to the WeChat bills CSV file')
    args = parser.parse_args()

    bills = read_wechat_bills(args.file_path)
    parsed_bills = parse_wechat_bills(bills)
    for bill in parsed_bills:
        print(bill)