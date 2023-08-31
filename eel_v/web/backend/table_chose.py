import eel
import dill

from web.backend.local.ini_parser import config
from web.backend.table_edit import Editor
from web.backend.local.dbOperations import DataBase
from web.backend.local.execute_command import Execute
from web.backend.table_create import TableCreate

class TableChose:

    #инициализация
    def __init__(fles, db : DataBase):
        if config.get('General', 'dark_theme') == 'True':
            eel.table_chose_switch()()
        TableChose.db = db
    
    @eel.expose
    def dt_table_chose(val):
        print(val)
        config.set('General', 'dark_theme', str(val))

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
        Execute(TableChose.db).handle(command)
    
    @eel.expose
    def to_create():
        TableCreate(TableChose.db)
    