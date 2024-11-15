import json
import configparser
from http.server import BaseHTTPRequestHandler, HTTPServer

config = configparser.ConfigParser()
config.read('/Users/louis.ning/project/github-project/naive-ui-admin/python/config.ini')

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/api-bill/list":
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            response = {
                "code": 200,
                "message": "Success",
                "data": {
                    "bills": [
                        {
                            "id": 1,
                            "transactionType": "支出",
                            "date": "2023-10-01",
                            "category": "食品",
                            "subCategory": "水果",
                            "account": "现金",
                            "currency": "CNY",
                            "amount": 100,
                            "member": "张三",
                            "merchant": "超市",
                            "projectCategory": "家庭",
                            "project": "日常开销",
                            "bookkeeper": "李四",
                            "notes": "无",
                            "version": 1
                        },
                        {
                            "id": 2,
                            "transactionType": "收入",
                            "date": "2023-10-02",
                            "category": "工资",
                            "subCategory": "基本工资",
                            "account": "银行",
                            "currency": "CNY",
                            "amount": 200,
                            "member": "张三",
                            "merchant": "公司",
                            "projectCategory": "工作",
                            "project": "月薪",
                            "bookkeeper": "李四",
                            "notes": "无",
                            "version": 1
                        }
                    ]
                }
            }
            self.wfile.write(bytes(json.dumps(response), "utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=int(config['DEFAULT']['Port'])):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting httpd server on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
