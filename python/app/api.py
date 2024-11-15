import os
import json
import configparser
from flask import Flask, request, jsonify
from flask_cors import CORS
import openpyxl
from io import BytesIO
from app.services.read_bills import read_wechat_bills, parse_wechat_bills

app = Flask(__name__)
CORS(app)

# 设置当前工作目录为脚本所在目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

config = configparser.ConfigParser()
config.read('config.ini')

@app.route('/api/api-bill/list', methods=['GET'])
def get_table_list():
    response = {
        "code": 200,
        "message": "Success",
        "data": {
            "page": 1,
            "pageSize": 10,
            "pageCount": 60,
            "itemCount": 600,
            "list": [
                {
                    "id": 1,
                    "transactionType": "支出",
                    "date": "2023-10-01",
                    "category": "食品",
                    "subCategory": "水果",
                },
                {
                    "id": 2,
                    "transactionType": "收入",
                    "date": "2023-10-02",
                    "category": "工资",
                    "subCategory": "基本工资",
                }
            ]
        }
    }
    return jsonify(response)

@app.route('/api/api-bill/upload', methods=['POST'])
def upload_file():
    files = request.files.getlist('files')
    data = []
    for file in files:
        # 保存上传的文件到临时路径
        temp_path = os.path.join('/tmp', file.filename)
        file.save(temp_path)
        
        # 读取并解析账单文件
        bills = read_wechat_bills(temp_path)
        parsed_bills = parse_wechat_bills(bills)
        
        # 删除临时文件
        os.remove(temp_path)
        
        data.extend(parsed_bills)
    
    response = {
        "code": 200,
        "message": "Upload successful",
        "data": [bill.__dict__ for bill in data]
    }
    return jsonify(response)

if __name__ == "__main__":
    port = config.getint('DEFAULT', 'Port', fallback=8000)
    app.run(host='0.0.0.0', port=port)
