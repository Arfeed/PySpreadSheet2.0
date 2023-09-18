import eel
from os import getcwd

from web.backend.table_edit import Editor
from web.backend.local.dbOperations import DataBase
from web.backend.local.execute_command import Execute
from web.backend.local.ini_parser import config
from web.backend.table_create import TableCreate
from web.backend.search import Search

class TableChose:

    #инициализация
    def __init__(fles, db : DataBase):
        TableChose.db = db

    @eel.expose
    def process_string(text:str):
        return text.strip()[-5:-1] == ' Tru'

    @eel.expose
    def set_val(value):
        config.set('General', 'dark_theme', str(value))
        with open('./web/backend/user/settings.ini', 'w') as conf_file:
            config.write(conf_file)

    @eel.expose
    def search(target):
        Search(target, TableChose.db)

    @eel.expose
    def load_tables():
        eel.add_table(TableChose.db.make_command(f'select table_name from information_schema.tables where table_schema = "{TableChose.db.db}";', False))
    
    @eel.expose
    def delete_last_table():
        TableChose.make_command('drop table {0};'.format(TableChose.db.make_command(f'select table_name from information_schema.tables where table_schema = "{TableChose.db.db}";', False)[-1][0]))

    @eel.expose
    def open_table(name):
        Editor(TableChose.db, name)
    
    @eel.expose
    def make_command(command):
        return Execute(TableChose.db).handle(command)
    
    @eel.expose
    def create():
        TableCreate(TableChose.db)
    