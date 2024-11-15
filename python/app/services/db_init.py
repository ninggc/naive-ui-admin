import os
import sqlite3
import configparser

# 设置当前工作目录为脚本所在目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 从 config.ini 文件中读取配置
config = configparser.ConfigParser()
config.read('config.ini')

db_path = config['DEFAULT']['DB_PATH']
table_name = config['DEFAULT']['TABLE_NAME']
db_timeout = config['DEFAULT'].getint('DB_TIMEOUT', 5)  # 新增配置项，默认值为5秒
table_ddl = config['DEFAULT']['TABLE_DDL']  # 新增配置项，表的DDL

# 连接到 SQLite 数据库（如果不存在则创建）
conn = sqlite3.connect(db_path, timeout=db_timeout)

# 创建一个游标对象来与数据库交互
cursor = conn.cursor()

# 创建表
cursor.execute(table_ddl)

# 提交更改并关闭连接
conn.commit()
conn.close()