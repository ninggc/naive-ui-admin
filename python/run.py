from app import app
import configparser

config = configparser.ConfigParser()
config.read('config.ini')

if __name__ == "__main__":
    port = config.getint('DEFAULT', 'Port', fallback=8000)
    app.run(host='0.0.0.0', port=port)