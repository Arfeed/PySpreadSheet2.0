from os import path, remove
from pickle import dump, load
import eel

from web.backend.local.ini_parser import config
from web.backend.local.dbOperations import DataBase
from web.backend.table_chose import TableChose
from web.backend.local.error import *

class Connect:

    #инициализация и все такое
    def __init__(fles):
        if config.get('General', 'dark_theme') == 'True':
            eel.connect_switch()
        Connect.load()

    @eel.expose
    def take_data(data, is_on):
        if not all(data):
            eel.alert_connect('Вы должны заполнить все поля!')
            return

        try:
            db = DataBase(data[0], data[1], data[2], data[3])
        except LoginError:
            eel.alert_connect('Неверные данные для входа!')
        else:
            if is_on == "on":
                Connect.save(data)
            else:
                with open('web/backend/user/user.pkl', 'wb') as file: 
                    remove(file)
            TableChose(db)
            eel.tch_connect()

    @eel.expose
    def dt_connect(val):
        config.set('General', 'dark_theme', str(val))

    def save(data):
        if not path.exists('web/backend/user/user.pkl'):
            a = open('web/backend/user/user.pkl', 'w')
            a.close()
        
        with open('web/backend/user/user.pkl', 'wb') as file:        
            dump(data, file)
        
    def load():
        if path.exists('web/backend/user/user.pkl'):
            with open('web/backend/user/user.pkl', 'rb') as file:
                data = load(file)
                if not data:
                    eel.alert_connect('Ошибка во время загрузки данных пользователя!')
                    return 1
                else:
                    eel.set_data(data)
        else:
            return 1